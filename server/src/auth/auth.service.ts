import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/user/entities/user.entity";
import { UserRepository } from "src/user/user.repository";
import * as bcrypt from 'bcryptjs';
import { UserType } from "src/user/types/user-type.type";
import { BusinessesService } from "src/businesses/businesses.service";
import { WorkersService } from "src/workers/workers.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
        private readonly businessService: BusinessesService,
        private readonly workerService: WorkersService
    ) { }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findByEmail(email);
        if (user && await this.validatePassword(password, user.password)) {
            return user;
        }
        return null;
    }


    async validateToken(token: string): Promise<User | null> {
        try {
            const decodedToken = await this.jwtService.verifyAsync(token);
            const user = await this.userRepository.getUserById(decodedToken.sub);
            return user;
        } catch (error) {
            return null;
        }
    }

    async login(auth: Partial<User>) {
        const user = await this.userRepository.findByEmail(auth.email);
        if (!user) {
            throw new NotFoundException('Credentials incorrect');
        }
        const pwMatches = await this.validatePassword(auth.password, user.password);
        if (!pwMatches) {
            throw new NotFoundException('Credentials incorrect');
        }
        const payload = { sub: user.id, expiresIn: 60 * 60 * 24 }
        const returnedUser = { ...user };
        delete returnedUser.password
        return {
            user: returnedUser,
            accessToken: await this.generateToken(payload),
        }
    }
    async register(userData: Partial<User>): Promise<User> {
        const { password, ...rest } = userData;
        const hash = await bcrypt.hash(password, 10);

        const newUser = await this.userRepository.saveUser({ ...rest, password: hash });
        if (newUser.userType === UserType.Business) {
            await this.businessService.create(newUser.id);
        } else {
            await this.workerService.create(newUser.id);
        }
        return newUser;

    }

    private validatePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
    private async generateToken(payload: Record<string, any>) {
        return await this.jwtService.signAsync(payload);
    }

}

