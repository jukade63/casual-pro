import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { RoleGuard } from 'src/role/role.guard';
import { Role } from 'src/role/role.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserType } from 'src/user/types/user-type';
import { NotificationGateway } from 'src/notification/notification.gateway';
import { Notification } from 'src/notification/entities/notification.entity';
import { NotificationService } from 'src/notification/notification.service';
import { UserRepository } from 'src/user/user.repository';
import { JobPostsService } from 'src/job_posts/job_posts.service';

@Controller('applications')
export class ApplicationsController {
  constructor(
    private notificationService: NotificationService,
    private readonly applicationsService: ApplicationsService,
    private readonly jobPostService: JobPostsService,

  ) { }

  @Post(':jobPostId')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Role([UserType.Worker])
  async create(@Request() req,
    @Param('jobPostId', ParseIntPipe) jobPostId: number
  ) {    
    const application = await this.applicationsService.create(req.user.sub, jobPostId);

    const jobPost = await this.jobPostService.findOne(jobPostId)
    await this.notificationService.create({
      message: `new application on your job post ${jobPost.title}`,
      read: false,
      to: jobPost.business.user,
    })
    return application

  }

  @Get()
  findAll() {
    return this.applicationsService.findAll();
  }

  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Role([UserType.Worker])
  @Get('worker/all')
  findAllByWorker(@Request() req) {
    return this.applicationsService.findAllByWorker(req);

  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.applicationsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateApplicationDto: UpdateApplicationDto) {
    return this.applicationsService.update(id, updateApplicationDto);
  }

  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Role([UserType.Worker])
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number
    ) {
    return this.applicationsService.remove(id);
  }
}
