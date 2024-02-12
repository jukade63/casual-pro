import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExperienceService {

  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
  ) { }
  async create(createExperienceDto: CreateExperienceDto): Promise<Experience> {
    const newEducation = this.experienceRepository.create({
      ...createExperienceDto,
      worker: { id: createExperienceDto.workerId }
    });
    return await this.experienceRepository.save(newEducation);
  }

  async findAll(workerId: number) {
    return await this.experienceRepository.find({
      where: { worker: { id: workerId } },
    });
  }

  async findOne(id: number, workerId: number) {
    return await this.experienceRepository.findOne({ where: { id, worker: { id: workerId } } })
  }

  async update(id: number, updateExperienceDto: UpdateExperienceDto) {
    const { workerId, ...updateData } = updateExperienceDto;

    const experience = await this.experienceRepository.findOne({ where: { id, worker: { id: workerId } } });

    if (!experience) {
      throw new NotFoundException(`No experience found for ID ${id} and/or worker with ID ${workerId}`);
    }

    const updatedExperience = { ...experience, ...updateData };
    return await this.experienceRepository.save(updatedExperience);

  }

  async remove(id: number, workerId: number) {
    const experience = await this.experienceRepository.findOne({ where: { id, worker: { id: workerId } } });

    if (!experience) {
      throw new NotFoundException(`No experience found for ID ${id} and/or worker with ID ${workerId}`);
    }

    await this.experienceRepository.remove(experience);

    return { message: 'Experience record removed successfully' };
  }
}
