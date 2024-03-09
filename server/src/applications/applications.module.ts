import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Applications } from './entities/application.entity';
import { User } from 'src/users/entities/user.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import { JobPost } from 'src/job_posts/entities/job_post.entity';
import { UsersModule } from 'src/users/users.module';
import { Jobs } from 'src/jobs/entities/job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Applications, User, Worker, JobPost, Jobs])],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
