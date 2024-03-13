import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Repository } from 'typeorm';
import { Jobs } from './entities/job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JobPost } from 'src/job_posts/entities/job_post.entity';
import { JobPostsService } from 'src/job_posts/job_posts.service';
import { Worker } from 'src/workers/entities/worker.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Jobs)
    private readonly jobsRepository: Repository<Jobs>,

    @InjectRepository(Worker)
    private readonly workerRepository: Repository<Worker>,
  
    @InjectRepository(JobPost)
    private readonly jobPostService: JobPostsService

  ) { }

  private async getJobById(id: number) {
    const job = await this.jobsRepository.findOne({ where: { id } });
    if (!job) {
      throw new NotFoundException(`Job with id ${id} not found`);
    }
    return job;
  }
  private async updateJobProperties(job: Jobs, updateJobDto: UpdateJobDto) {
    if (updateJobDto.completed !== undefined) {
      job.completed = updateJobDto.completed;
    }
    if (updateJobDto.isFavorite !== undefined) {
      job.isFavorite = updateJobDto.isFavorite;
    }
  }
  async create(createJobDto: CreateJobDto) {
    const job = await this.jobsRepository.save(this.jobsRepository.create(createJobDto));
    await this.jobPostService.update(job.jobPost.id, { ...job.jobPost, job: job });
    return job
  }

  async findAll() {
    return await this.jobsRepository.find({ relations: ['jobPost', 'workers'] })
  }

  async findFavorites(req) {
    
    const { sub } = req.user
    const worker = await this.workerRepository.findOne({ where: { user: { id: sub } } })    
    console.log(worker);
    
    
    const jobs = await this.jobsRepository.find({
      where: { isFavorite: true, workers: { id: worker.id } },
      relations: ['jobPost', 'jobPost.business', 'jobPost.business.user', 'jobPost.applications'],
      select: {
        jobPost: {
          id: true,
          title: true,
          startDate: true,
          endDate: true,
          business: {
            id: true,
            user: {
              email: true,
              username: true,
              phoneNumber: true,
            },
          },
          applications: {
            id: true,
            status: true,
          }
        }
      }
    })
    
    if (!jobs) {
      throw new NotFoundException('No jobs found');
    }
    return jobs

  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  async updateJobApplication(id: number, updateJobDto: UpdateJobDto) {
    const job = await this.getJobById(id);
    await this.updateJobProperties(job, updateJobDto);
    return await this.jobsRepository.save(job);
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
