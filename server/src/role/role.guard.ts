import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserService } from "src/user/user.service";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private usersService: UserService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        const request = context.switchToHttp().getRequest();             
        
        if(request.user){
            const user = await this.usersService.getUserById(request.user.sub);
            
            console.log(roles.includes(user.userType));
            
            return roles.includes(user.userType);
        }
        return false
    }
}