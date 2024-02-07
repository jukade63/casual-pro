import { Module } from '@nestjs/common';
import { JobPostsService } from './job_posts.service';
import { JobPostsController } from './job_posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPost } from './entities/job_post.entity';
import { Applications } from 'src/applications/entities/application.entity';
import { Jobs } from 'src/jobs/entities/job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobPost, Applications, Jobs])],
  controllers: [JobPostsController],
  providers: [JobPostsService],
})
export class JobPostsModule {}
