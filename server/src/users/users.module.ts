import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Business } from 'src/businesses/entities/business.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { WorkersModule } from 'src/workers/workers.module';
import { BusinessesModule } from 'src/businesses/businesses.module';

@Module({
  imports: [CloudinaryModule, TypeOrmModule.forFeature([User]), JwtModule.register({
    global: true, 
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1d' },
  }), WorkersModule, BusinessesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
