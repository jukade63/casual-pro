import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobPostDto } from './dto/create-job_post.dto';
import { UpdateJobPostDto } from './dto/update-job_post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPost, JobType, Status } from './entities/job_post.entity';
import { Jobs } from 'src/jobs/entities/job.entity';
import { User } from 'src/users/entities/user.entity';
import { application } from 'express';


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
  async create(req, createJobPostDto: CreateJobPostDto): Promise<JobPost> {

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

  async findAll(location?: string, category?: string, jobType?: JobType, limit?: number, start?: number) {

    let query = this.jobPostRepository.createQueryBuilder('job_post')
      .where('job_post.status = :status', { status: Status.Approved });

    if (location) {
      query = query.andWhere('EXISTS (SELECT 1 FROM UNNEST(job_post.location) AS loc WHERE loc ILIKE :location)', { location: `%${location}%` });
    }
    if (category) {
      query = query.andWhere('job_post.category ILIKE :category', { category: `%${category}%` });
    }
    if (jobType) {
      query = query.andWhere('job_post.jobType = :jobType', { jobType: jobType });
    }

    query = query.leftJoinAndSelect('job_post.business', 'business')
      .leftJoinAndSelect('business.user', 'user')
      .select(['job_post', 'business', 'user.username', 'user.phoneNumber', 'user.email'])
      .orderBy('job_post.createdAt', 'DESC');

    if (start !== undefined && limit !== undefined) {
      query = query.skip(start).take(limit);
    }

    return query.getMany();
  }

  async fineOne(id: number) {
    try {
      const jobPost = await this.jobPostRepository.findOne({
        where: { id },
        relations: ['business', 'business.user']
      })
      if (!jobPost) throw new NotFoundException('job post not found')
      return jobPost
    } catch (error) {

    }
  }

  async findOneByBusiness(id: number) {
    const jobPost = await this.jobPostRepository
      .createQueryBuilder('job_post')
      .where('job_post.id = :id', { id })
      .leftJoinAndSelect('job_post.applications', 'applications')
      .leftJoinAndSelect('applications.worker', 'worker')
      .leftJoinAndSelect('worker.user', 'user')
      .leftJoinAndSelect('worker.education', 'education')
      .leftJoinAndSelect('worker.experiences', 'experiences')
      .leftJoinAndSelect('worker.skills', 'skills')
      .getOne();

    return jobPost;
  }

  async findAllByBusiness(req) {

    console.log(req.user);
    
    try {
      const { sub: userId } = req.user;


      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['business'],
      });

      if (!user) {
        throw new NotFoundException('Business not found');
      }

      const jobPosts = await this.jobPostRepository
        .createQueryBuilder('job_post')
        .where('job_post.businessId = :businessId', {
          businessId: user.business.id,
        })
        .leftJoinAndSelect('job_post.applications', 'applications')
        .leftJoinAndSelect('applications.worker', 'worker')
        .leftJoinAndSelect('worker.user', 'user')
        .leftJoinAndSelect('worker.education', 'education')
        .leftJoinAndSelect('worker.experiences', 'experiences')
        .leftJoinAndSelect('worker.skills', 'skills')
        .getMany();

      return jobPosts;
    } catch (error) {
      throw new Error(`Error fetching job posts by business: ${error.message}`);
    }
  }

  async update(id: number, updateJobPostDto: UpdateJobPostDto) {
    const jobPost = await this.jobPostRepository.findOneBy({ id });
    if (!jobPost) {
      return new NotFoundException('job post not found')
    }
    return await this.jobPostRepository.save({ ...jobPost, ...updateJobPostDto });

  }

  remove(id: number) {
    return `This action removes a #${id} jobPost`;
  }
}
