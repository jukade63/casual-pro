import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from './user.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('worker')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createWorkerUser(createUserDto);
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('business')
  createBusiness(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createBusinessUser(createUserDto);
  }
  @Post('login')
  login(@Body() authDto: AuthDto) {
    return this.usersService.login(authDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@Request() req) {
    return req.user
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
