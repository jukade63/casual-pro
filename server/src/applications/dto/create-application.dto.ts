import { Worker } from "src/workers/entities/worker.entity";
import { ApplicationStatus } from "../entities/application.entity";

export class CreateApplicationDto {
    userId: number
    jobPostId: number
}
