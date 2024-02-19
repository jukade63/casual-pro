import { IsString, IsEmail, IsEnum, IsOptional, isInt, IsInt } from 'class-validator';

import { CreateUserDto } from './create-user.dto';
import { UserType } from '../entities/user.entity';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
