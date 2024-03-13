import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Applications } from './entities/application.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import { JobPost } from 'src/job_posts/entities/job_post.entity';
import { Jobs } from 'src/jobs/entities/job.entity';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Applications, User, Worker, JobPost, Jobs])],
  controllers: [ApplicationsController],
  providers: [ApplicationsService, UserService, UserRepository],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
