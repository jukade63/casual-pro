import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Worker } from './entities/worker.entity';
import { Repository } from 'typeorm';
import { Experience } from 'src/experience/entities/experience.entity';

@Injectable()
export class WorkersService {

  constructor(
    @InjectRepository(Worker)
    private workerRepository: Repository<Worker>,
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
    ) {}
  create(createWorkerDto: CreateWorkerDto) {
    return 'This action adds a new worker';
  }

  findAll() {
    return `This action returns all workers`;
  }

  async findOne(id: number): Promise<Worker> {
    const worker = await this.workerRepository.findOne({
      where: { id },
      relations: ['experiences', 'education', 'applications', 'skills', 'jobs'],
    });
    if (!worker) {
      throw new NotFoundException(`Worker with ID ${id} not found.`);
    }

    return worker;
  }
  update(id: number, updateWorkerDto: UpdateWorkerDto) {
    return `This action updates a #${id} worker`;
  }

  remove(id: number) {
    return `This action removes a #${id} worker`;
  }
}
