import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository) { }

    async createUser(userData: Partial<User>) {
        return await this.userRepository.createUser(userData);
    }
    async updateUser(userId: number, userData: Partial<User>) {
        return await this.userRepository.updateUser(userId, userData);
    }

    async getUserById(id: number) {
        const user = await this.userRepository.getUserById(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user
    }

}
