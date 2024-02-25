import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jobs } from './entities/job.entity';
import { Ratings } from 'src/ratings/entities/rating.entity';
import { Applications } from 'src/applications/entities/application.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import { ApplicationsService } from 'src/applications/applications.service';
import { WorkersService } from 'src/workers/workers.service';
import { ExperienceService } from 'src/experience/experience.service';
import { Experience } from 'src/experience/entities/experience.entity';
import { User } from 'src/users/entities/user.entity';
import { JobPost } from 'src/job_posts/entities/job_post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Jobs, Ratings, Applications, Worker, Experience, User, JobPost])],
  controllers: [JobsController],
  providers: [JobsService, ApplicationsService, WorkersService, ExperienceService],
})
export class JobsModule {}
