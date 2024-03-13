import { JobPost } from "src/job_posts/entities/job_post.entity"
import { User } from "src/user/entities/user.entity"

export class CreateBusinessDto {
    industry?: string
    description?: string
    user: User
    jobPosts?: JobPost[]
}
