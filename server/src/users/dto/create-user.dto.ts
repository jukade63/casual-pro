import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { UserType } from '../entities/user.entity';

export class CreateUserDto {
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
  readonly imgUrl?: string;
}

