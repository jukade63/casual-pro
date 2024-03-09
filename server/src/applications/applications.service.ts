import { ConflictException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Applications } from './entities/application.entity';
import { User, UserType } from 'src/users/entities/user.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import { JobPost } from 'src/job_posts/entities/job_post.entity';
import { Jobs } from 'src/jobs/entities/job.entity';

@Injectable()
export class ApplicationsService {

  constructor(
    @InjectRepository(Applications)
    private readonly applicationsRepository: Repository<Applications>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Worker)
    private workerRepository: Repository<Worker>,
    @InjectRepository(JobPost)
    private jobPostRepository: Repository<JobPost>,
    @InjectRepository(Jobs)
    private jobsRepository: Repository<Jobs>,

  ) { }

  async create(req, jobPostId: number) {

    const { sub } = req.user

    const user = await this.userRepository.findOneBy({ id: sub })

    if (!user) {
      throw new Error(`User with id ${sub} not found`)
    }

    const worker = await this.workerRepository.findOneBy({ user })

    const jobPost = await this.jobPostRepository.findOneBy({ id: jobPostId })

    const existingApplication = await this.applicationsRepository.findOne({
      where:
      {
        jobPost: { id: jobPostId }, worker: { id: worker.id }
      }
    })

    if (existingApplication) {
      throw new ConflictException(`Duplicate application`);
    }

    const application = this.applicationsRepository.create({
      worker,
      jobPost: {
        id: jobPostId
      }
    })

    const job = await this.jobsRepository.findOneBy({ jobPost: { id: jobPostId } })


    if (!job) {
      throw new NotFoundException
        (`Job with id ${jobPost.job.id} not found`)
    }

    await job.addWorker(worker)

    return await this.applicationsRepository.save(application)

  }

  async findAllByWorker(req) {
    const { sub } = req.user
    try {
      const worker = await this.workerRepository.findOne({
        where: { user: { id: sub } },
      })
      const applications = await this.applicationsRepository.find({
        where: {
          worker: { id: worker.id },
        },
        relations: ['jobPost', 'jobPost.business', 'jobPost.business.user'],
        order: { appliedAt: 'DESC' },
      });
      return applications
    } catch (error) {
      throw error
    }

  }

  findAll() {
    return `This action returns all applications`;
  }

  findOne(id: number) {
    const application = this.applicationsRepository.findOne({
      where: { id },
      relations: ['worker',]
    });
    if (!application) {
      throw new Error(`Application with id ${id} not found`);
    }
    return application
  }

  async update(id: number, updateApplicationDto: UpdateApplicationDto) {
    const application = await this.findOne(id)
    return await this.applicationsRepository.save({ ...application, ...updateApplicationDto })
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }
}
