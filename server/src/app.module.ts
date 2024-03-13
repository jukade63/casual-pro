import { ClassSerializerInterceptor, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule} from '@nestjs/config'
import { DatabaseModule } from './database/database.module';
import { WorkersModule } from './workers/workers.module';
import { BusinessesModule } from './businesses/businesses.module';
import { EducationModule } from './education/education.module';
import { ExperienceModule } from './experience/experience.module';
import { SkillsModule } from './skills/skills.module';
import { JobPostsModule } from './job_posts/job_posts.module';
import { ApplicationsModule } from './applications/applications.module';
import { JobsModule } from './jobs/jobs.module';
import { RatingsModule } from './ratings/ratings.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from 'middlewares/logger.middleware';

@Module({
  imports: [AuthModule, UserModule, DatabaseModule, WorkersModule,
    BusinessesModule,
    EducationModule,
    ExperienceModule,
    SkillsModule,
    JobPostsModule,
    ApplicationsModule,
    JobsModule,
    RatingsModule, CloudinaryModule, ConfigModule.forRoot({ isGlobal: true }),],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    }
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
 }
