import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Repository } from 'typeorm';
import { Education } from './entities/education.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Worker } from 'src/workers/entities/worker.entity';

@Injectable()
export class EducationService {

  constructor(
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
    @InjectRepository(Worker)
    private readonly workerRepository: Repository<Worker>,
  ) { }
  async create(createEducationDto: CreateEducationDto): Promise<Education> {
    
    const worker = await this.workerRepository.findOne({ where: { user: {id: createEducationDto.userId} } });
    
    if (!worker) {
      throw new NotFoundException(`No worker found for ID ${createEducationDto.userId}`);
      
    }
    const newEducation = this.educationRepository.create({
      ...createEducationDto,
      worker
    });
    return await this.educationRepository.save(newEducation);
  }

  async findAll(userId: number) {
    const worker = await this.workerRepository.findOne({ where: { user: {id: userId} } });
    if (!worker) {
      throw new NotFoundException(`No worker found for ID ${userId}`);
    }
    return await this.educationRepository.find({
      where: { worker: { id: worker.id } },
    });
  }

  async findOne(id: number, workerId: number) {
    return await this.educationRepository.findOne({ where: { id, worker: { id: workerId } } })
  }

  async update(id: number, updateEducationDto: UpdateEducationDto) {
    const { userId, ...updateData } = updateEducationDto;

    const worker = await this.workerRepository.findOne({ where: { user: {id: updateEducationDto.userId} } });
    if (!worker) {
      throw new NotFoundException(`No worker found for ID ${updateEducationDto.userId}`);
      
    }

    const education = await this.educationRepository.findOne({ where: { id, worker: { id: worker.id } } });

    if (!education) {
      throw new NotFoundException(`No education found for ID ${id} and/or worker with ID ${worker.id}`);
    }

    const updatedEducation = { ...education, ...updateData };
    return await this.educationRepository.save(updatedEducation);

  }

  async remove(id: string, userId: string) {
    const parsedId = parseInt(id, 10)
    const parsedUserId = parseInt(userId, 10)
    const worker = await this.workerRepository.findOne({ where: { user: {id: parsedUserId} } });
    const education = await this.educationRepository.findOne({ where: { id: parsedId, worker: { id: worker.id } } });

    if (!education) {
      throw new NotFoundException(`No education found for ID ${id} and/or worker with ID ${worker.id}`);
    }

    await this.educationRepository.remove(education);

    return { message: 'Education record removed successfully' };
  }
}
