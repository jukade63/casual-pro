import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Worker } from 'src/workers/entities/worker.entity';
import * as argon from 'argon2'
import { Business } from 'src/businesses/entities/business.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Worker)
    private readonly workerRepository: Repository<Worker>,
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly cloudinaryService: CloudinaryService

  ) { }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, userType } = createUserDto;
    
    const existingUser = await this.userRepository.findOne({ where: { email } });
    
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    
    const newUser = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(newUser);
    
    switch (userType) {
      case 'worker':
        const newWorker = this.workerRepository.create({ user: savedUser });
        await this.workerRepository.save(newWorker);
        break;
      case 'business':
        const newBusiness = this.businessRepository.create({ user: savedUser });
        await this.businessRepository.save(newBusiness);
        break;
      default:
        throw new BadRequestException('Invalid user type');
    }
    
    return savedUser;
  }
  
  async createWorkerUser(createUserDto: CreateUserDto): Promise<User> {
    return this.createUser(createUserDto);
  }
  
  async createBusinessUser(createUserDto: CreateUserDto): Promise<User> {
    return this.createUser(createUserDto);
  }
  
  async login(authDto: AuthDto): Promise<any> {

    const foundUser = await this.userRepository.findOne({ where: { email: authDto.email } });
    if (!foundUser) {
      throw new NotFoundException('Credentials incorrect');
    }

    const pwMatches = await argon.verify(foundUser.password, authDto.password)
    if (!pwMatches) {
      throw new NotFoundException('Credentials incorrect');
    }
    const payload = { sub: foundUser.id, username: foundUser.username, role: foundUser.userType };

    const { password, ...user } = foundUser

    return {
      user,
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
        secret: this.config.get('JWT_SECRET')
      })
    }
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {

    const user = await this.findOne(updateUserDto.id);


    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (updateUserDto.imgUrl && updateUserDto.imgUrl !== user.imgUrl) {
      try {
        await this.cloudinaryService.deleteImage(user.publicId);
      } catch (error) {
        console.error('Failed to delete old image:', error.message);
      }
      try {
        const data = await this.cloudinaryService.uploadImage(updateUserDto.imgUrl);

        updateUserDto.imgUrl = data.secure_url
        updateUserDto.publicId = data.public_id
      } catch (error) {
        throw new Error('Failed to upload image')
      }
    }
    return await this.userRepository.save(updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.userRepository.delete(id);
  }
}
