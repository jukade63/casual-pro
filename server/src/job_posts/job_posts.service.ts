import { Injectable } from '@nestjs/common';
import { CreateJobPostDto } from './dto/create-job_post.dto';
import { UpdateJobPostDto } from './dto/update-job_post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPost } from './entities/job_post.entity';
import { Jobs } from 'src/jobs/entities/job.entity';


@Injectable()
export class JobPostsService {

  constructor(
    @InjectRepository(JobPost)
    private readonly jobPostRepository: Repository<JobPost>,
    @InjectRepository(Jobs)
    private readonly jobRepository: Repository<Jobs>,
  ) {}
  async create(createJobPostDto: CreateJobPostDto): Promise<JobPost> {
    const jobPost = this.jobPostRepository.create(createJobPostDto);
    const post = await this.jobPostRepository.save(jobPost);

    const job = this.jobRepository.create({
      completed: false,
      jobPost: post,
      workers: [],
    })

    await this.jobRepository.save(job)
    return post
  }

  findAll() {
    return `This action returns all jobPosts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobPost`;
  }

  update(id: number, updateJobPostDto: UpdateJobPostDto) {
    return `This action updates a #${id} jobPost`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobPost`;
  }
}
