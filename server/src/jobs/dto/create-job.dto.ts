import { Ratings } from "src/ratings/entities/rating.entity"
import { Jobs } from "../entities/job.entity"
import { Worker } from "src/workers/entities/worker.entity"

export class CreateJobDto {
    completed: boolean
    job: Jobs
    workers: Worker[]
    ratings: Ratings[]

}
