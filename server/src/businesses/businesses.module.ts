import { Module } from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { BusinessesController } from './businesses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { JobPost } from 'src/job_posts/entities/job_post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Business, JobPost])],
  controllers: [BusinessesController],
  providers: [BusinessesService],
})
export class BusinessesModule {}
