import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserType } from 'src/user/types/user-type.type';
import { BusinessesService } from "src/businesses/businesses.service";
import { WorkersService } from "src/workers/workers.service";
import { RefreshGuard } from './refresh.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly businessService: BusinessesService,
        private readonly workerService: WorkersService,

    ) { }

    @Post('login')
    login(@Body() body: Partial<CreateUserDto>) {
        return this.authService.login(body)
    }

    @Post('register')
    async register(@Body() body: CreateUserDto) {
        const user = await this.authService.register(body)
        if (user.userType === UserType.Business) {
            await this.businessService.create(user.id);
        } else {
            await this.workerService.create(user.id);
        }
        return user
    }

    @Post('refresh')
    @UseGuards(RefreshGuard)
    refresh(@Request() req) {
        console.log('refresh');

        return this.authService.refreshToken(req.user)
    }

    @Post('forgot-password')
    forgotPassword(@Body() dto: ForgotPasswordDto) {
        return this.authService.forgotPassword(dto.email)

    }



}
