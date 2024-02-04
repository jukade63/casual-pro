import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jobs } from './entities/job.entity';
import { Ratings } from 'src/ratings/entities/rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Jobs, Ratings])],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
