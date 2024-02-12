import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Repository } from 'typeorm';
import { Education } from './entities/education.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EducationService {

  constructor(
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
  ) { }
  async create(createEducationDto: CreateEducationDto): Promise<Education> {
    const newEducation = this.educationRepository.create({
      ...createEducationDto,
      worker: { id: createEducationDto.workerId }
    });
    return await this.educationRepository.save(newEducation);
  }

  async findAll(workerId: number) {
    return await this.educationRepository.find({
      where: { worker: { id: workerId } },
    });
  }

  async findOne(id: number, workerId: number) {
    return await this.educationRepository.findOne({ where: { id, worker: { id: workerId } } })
  }

  async update(id: number, updateEducationDto: UpdateEducationDto) {
    const { workerId, ...updateData } = updateEducationDto;

    const education = await this.educationRepository.findOne({ where: { id, worker: { id: workerId } } });

    if (!education) {
      throw new NotFoundException(`No education found for ID ${id} and/or worker with ID ${workerId}`);
    }

    const updatedEducation = { ...education, ...updateData };
    return await this.educationRepository.save(updatedEducation);

  }

  async remove(id: number, workerId: number) {
    const education = await this.educationRepository.findOne({ where: { id, worker: { id: workerId } } });

    if (!education) {
      throw new NotFoundException(`No education found for ID ${id} and/or worker with ID ${workerId}`);
    }

    await this.educationRepository.remove(education);

    return { message: 'Education record removed successfully' };
  }
}
