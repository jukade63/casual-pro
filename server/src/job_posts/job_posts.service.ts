import { Injectable, NotFoundException, Request } from '@nestjs/common';
import { CreateJobPostDto } from './dto/create-job_post.dto';
import { UpdateJobPostDto } from './dto/update-job_post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { JobPost } from './entities/job_post.entity';
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

  async findAll(location?: string, category?: string) {
    let foundJobPosts: JobPost[] = [];
    const queryOptions: FindManyOptions<JobPost> = {
      relations: ['business.user'],
    };
  
    if (location && category) {
      queryOptions.where = [{ location: ILike(`%${location}%`), category: ILike(`%${category}%`) }];
    } else if (location) {
      queryOptions.where = { location: ILike(`%${location}%`) };
    } else if (category) {
      queryOptions.where = { category: ILike(`%${category}%`) };
    }
  
    foundJobPosts = await this.jobPostRepository.find(queryOptions);
  
    foundJobPosts.forEach(jobPost => {
      if (jobPost.business && jobPost.business.user) {
        delete jobPost.business.user.password;
      }
    });
  
    return foundJobPosts;
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
