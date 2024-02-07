import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString } from 'class-validator';

export class AuthDto extends PartialType(CreateUserDto) {
    @IsEmail()
    email: string;
    
    @IsString()
    password: string;
}
