import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from './entities/education.entity';
import { Worker } from 'src/workers/entities/worker.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Education, Worker])],
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule {}
