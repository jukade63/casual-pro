import { Injectable, NotFoundException, Request } from '@nestjs/common';
import { CreateJobPostDto } from './dto/create-job_post.dto';
import { UpdateJobPostDto } from './dto/update-job_post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { JobPost, JobType } from './entities/job_post.entity';
import { Jobs } from 'src/jobs/entities/job.entity';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class JobPostsService {

  constructor(
    @InjectRepository(JobPost)
    private readonly jobPostRepository: Repository<JobPost>,
    @InjectRepository(Jobs)
    private readonly jobRepository: Repository<Jobs>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }
  async create(@Request() req, createJobPostDto: CreateJobPostDto): Promise<JobPost> {

    console.log(req.user);

    const { sub } = req.user
    const user = await this.userRepository.findOne({ where: { id: sub }, relations: ['business'] })

    if (!user) throw new NotFoundException('user not found')

    const jobPost = this.jobPostRepository.create({ ...createJobPostDto, business: user.business });
    const savedJobPost = await this.jobPostRepository.save(jobPost);

    const job = this.jobRepository.create({
      completed: false,
      jobPost: savedJobPost,
      workers: [],
    })

    await this.jobRepository.save(job)
    return savedJobPost
  }

  async findAll(location?: string, category?: string, jobType?: JobType) {
    
    let query = this.jobPostRepository.createQueryBuilder('job_post');

    query = query.leftJoinAndSelect('job_post.business', 'business').leftJoinAndSelect('business.user', 'user');

    query = query.select(['job_post', 'business', 'user.username', 'user.phoneNumber', 'user.email']);

    if (location) {
      query = query.andWhere('EXISTS (SELECT 1 FROM UNNEST(job_post.location) AS loc WHERE loc ILIKE :location)', { location: `%${location}%` });
    }
    if (category) {
      query = query.andWhere('job_post.category ILIKE :category', { category: `%${category}%` });
    }
    if (jobType) {
      query = query.andWhere('job_post.jobType = :jobType', { jobType: jobType });
    }

    return query.getMany();
  }


  async findOne(id: number) {
    const jobPost = await this.jobPostRepository.findOne({ where: { id }, relations: ['business.user'] });
    if (!jobPost) {
      throw new NotFoundException(`JobPost with id ${id} not found`);
    } else {
      if (jobPost.business && jobPost.business.user) {
        delete jobPost.business.user.password;
      }
      return jobPost

    }
  }

  update(id: number, updateJobPostDto: UpdateJobPostDto) {
    return `This action updates a #${id} jobPost`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobPost`;
  }
}
