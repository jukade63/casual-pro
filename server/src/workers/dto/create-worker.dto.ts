import { User } from "src/users/entities/user.entity";

export class CreateWorkerDto {
    user: User
    availableFrom?: string
    availableTo?: string
}
