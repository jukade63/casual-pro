import { JobType } from "../entities/experience.entity"

export class CreateExperienceDto {
    jobType: JobType
    startDate: Date
    endDate: Date
    workerId: number
}
