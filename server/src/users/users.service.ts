import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
    private readonly config: ConfigService
    
  ) {}

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

  async createWorkerUser(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const newUser = this.userRepository.create(createUserDto)

    const savedUser = await this.userRepository.save(newUser);

    const newWorker = this.workerRepository.create({
      user: savedUser,
    })
    
    await this.workerRepository.save(newWorker)

    return savedUser
  }

  async createBusinessUser(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;  
    const existingUser = await this.userRepository.findOne({ where: { email } });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const newUser = this.userRepository.create(createUserDto)
    const savedUser = await this.userRepository.save(newUser);

    const newBusiness = this.businessRepository.create({
      user: savedUser
    })

    await this.businessRepository.save(newBusiness)
    return savedUser
  }

  async login(authDto: AuthDto): Promise<any> {
    const { email, password } = authDto;
    const user = await this.userRepository.findOne({ where: { email} });
    if (!user) {
      throw new NotFoundException('Credentials incorrect');
    }
   
    const pwMatches = await argon.verify(user.password, password)
    if (!pwMatches) {
      throw new NotFoundException('Credentials incorrect');
    }
    const payload = { sub: user.id, username: user.email };

    return {
        access_token: await this.jwtService.signAsync(payload, {
            expiresIn: '15m',
            secret: this.config.get('JWT_SECRET')
        })
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findOne(id); 
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOne({where: {id}});
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); 
    await this.userRepository.delete(id);
  }
}
