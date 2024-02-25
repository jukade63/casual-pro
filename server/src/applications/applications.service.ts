import { Injectable, UseGuards } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Applications } from './entities/application.entity';
import { User, UserType } from 'src/users/entities/user.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import { JobPost } from 'src/job_posts/entities/job_post.entity';

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

  ) { }

  async create(req, createApplicationDto: CreateApplicationDto) {

    const { sub } = req.user

    const { jobPostId } = createApplicationDto

    const user = await this.userRepository.findOneBy({ id: sub })

    if (!user) {
      throw new Error(`User with id ${sub} not found`)
    }

    const worker = await this.workerRepository.findOneBy({ user })

    const jobPost = await this.jobPostRepository.findOneBy({ id: jobPostId })

    if (!jobPost) {
      throw new Error(`Job post with id ${jobPostId} not found`)
    }

    const application = this.applicationsRepository.create({
      worker,
      jobPost: {
        id: jobPostId
      }
    })
    return await this.applicationsRepository.save(application)

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

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    return `This action updates a #${id} application`;
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }
}
