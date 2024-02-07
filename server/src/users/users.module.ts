import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Business } from 'src/businesses/entities/business.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, Worker, Business]), JwtModule.register({})],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
