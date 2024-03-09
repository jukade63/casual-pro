import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jobs } from './entities/job.entity';
import { Ratings } from 'src/ratings/entities/rating.entity';
import { Applications } from 'src/applications/entities/application.entity';
import { JobPost } from 'src/job_posts/entities/job_post.entity';
import { WorkersModule } from 'src/workers/workers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Jobs, Ratings, JobPost,Applications]), WorkersModule],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService],
})
export class JobsModule {}
