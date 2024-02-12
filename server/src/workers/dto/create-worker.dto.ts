import { User } from "src/users/entities/user.entity";

export class CreateWorkerDto {
    user: User
    available_from: string
    available_to: string
}
