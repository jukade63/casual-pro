import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skills } from './entities/skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skills)
    private readonly skillsRepository: Repository<Skills>, 
  ) { }
  async create(createSkillDto: CreateSkillDto) : Promise<Skills> {
   
    const newEducation = this.skillsRepository.create({
      ...createSkillDto,
      worker: { id: createSkillDto.workerId }
    });
    return await this.skillsRepository.save(newEducation);
  }

  async findAll(workerId: number) {
    return await this.skillsRepository.find({
      where: { worker: { id: workerId } },
    });
  }

  async findOne(id: number, workerId: number) {
    return await this.skillsRepository.findOne({ where: { id, worker: { id: workerId } } })
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {
    const { workerId, ...updateData } = updateSkillDto;

    const education = await this.skillsRepository.findOne({ where: { id, worker: { id: workerId } } });

    if (!education) {
      throw new NotFoundException(`No education found for ID ${id} and/or worker with ID ${workerId}`);
    }

    const updatedEducation = { ...education, ...updateData };
    return await this.skillsRepository.save(updatedEducation);
  }

  async remove(id: number, workerId: number) {
    const education = await this.skillsRepository.findOne({ where: { id, worker: { id: workerId } } });

    if (!education) {
      throw new NotFoundException(`No education found for ID ${id} and/or worker with ID ${workerId}`);
    }

    await this.skillsRepository.remove(education);

    return { message: 'Education record removed successfully' };
  }
}
