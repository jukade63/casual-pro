import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { WorkersModule } from './workers/workers.module';
import { BusinessesModule } from './businesses/businesses.module';
import { EducationModule } from './education/education.module';
import { ExperienceModule } from './experience/experience.module';
import { SkillsModule } from './skills/skills.module';
import { JobPostsModule } from './job_posts/job_posts.module';
import { ApplicationsModule } from './applications/applications.module';
import { JobsModule } from './jobs/jobs.module';
import { RatingsModule } from './ratings/ratings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),  
    DatabaseModule, 
    UsersModule, 
    WorkersModule, 
    BusinessesModule, 
    EducationModule, 
    ExperienceModule, 
    SkillsModule, 
    JobPostsModule, 
    ApplicationsModule, 
    JobsModule, 
    RatingsModule, CloudinaryModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
