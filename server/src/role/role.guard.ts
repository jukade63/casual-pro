import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UsersService } from "src/users/users.service";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private usersService: UsersService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        const role = this.reflector.get<string>('role', context.getHandler());
        const request = context.switchToHttp().getRequest();             
        
        if(request.user){
            const user = await this.usersService.findOne(request.user.sub);
            return user.userType === role
        }
        return false
    }
}