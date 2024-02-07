import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Repository } from 'typeorm';
import { Jobs } from './entities/job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationsService } from 'src/applications/applications.service';
import { WorkersService } from 'src/workers/workers.service';
import { ApplicationStatus, Applications } from 'src/applications/entities/application.entity';
import { Worker } from 'src/workers/entities/worker.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Jobs)
    private readonly jobsRepository: Repository<Jobs>,
    private readonly applicationsService: ApplicationsService,
    private readonly workersService: WorkersService,

  ) { }
  create(createJobDto: CreateJobDto) {
  }

  findAll() {
    return `This action returns all jobs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  async updateJobApplication(id: number, applicationId: number) {

    const job = await this.jobsRepository.findOne({ where: { id } });
    if (!job) {
      throw new Error(`Job with id ${id} not found`);
    }

    const application: Applications = await this.applicationsService.findOne(applicationId)

    if (!application) {
      throw new NotFoundException(`Application with id ${applicationId} not found`)
    }

    const worker = application.worker
    

    if (!job.workers) {
      job.workers = [worker];
    } else {
      job.workers.push(worker);
    }

    await this.jobsRepository.save(job);

    return `update job #${id} successfully`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
