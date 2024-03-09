import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { QueryBuilder, Repository } from 'typeorm';
import { Jobs } from './entities/job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationsService } from 'src/applications/applications.service';
import { WorkersService } from 'src/workers/workers.service';
import { JobPost } from 'src/job_posts/entities/job_post.entity';
import { JobPostsService } from 'src/job_posts/job_posts.service';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Jobs)
    private readonly jobsRepository: Repository<Jobs>,
    private readonly workersService: WorkersService,
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
    const worker = await this.workersService.findOneByUserId(req.user.sub);
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
