import { IsString, IsEmail, IsEnum, IsOptional, isInt, IsInt } from 'class-validator';
import { UserType } from '../entities/user.entity';

export class CreateUserDto {
  @IsInt()
  readonly id: number;
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsEmail()
  readonly email: string;

  @IsEnum(UserType)
  readonly userType: UserType;

  @IsOptional()
  @IsString()
  readonly phoneNumber?: string;

  @IsOptional()
  @IsString()
  imgUrl?: string;

  @IsOptional()
  @IsString()
  publicId?: string;
}

