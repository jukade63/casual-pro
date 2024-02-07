import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Applications } from './entities/application.entity';

@Injectable()
export class ApplicationsService {

 
  constructor(
    @InjectRepository(Applications)
    private readonly applicationsRepository: Repository<Applications>) {}
    
  async create(createApplicationDto: CreateApplicationDto) {
    const application = this.applicationsRepository.create(createApplicationDto);
    return this.applicationsRepository.save(application);
  }

  findAll() {
    return `This action returns all applications`;
  }

  findOne(id: number) {
    const application = this.applicationsRepository.findOne({where: {id}, relations: ['worker', 'jobPost']});
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
