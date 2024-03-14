import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Business } from 'src/businesses/entities/business.entity';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';

@Module({
  imports:[TypeOrmModule.forFeature([User, Business])],
  controllers: [UserController],
  providers: [UserService, UserRepository, CloudinaryService],
  exports: [UserService, TypeOrmModule]
})
export class UserModule {}
