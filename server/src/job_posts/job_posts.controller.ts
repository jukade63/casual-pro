import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, } from '@nestjs/common';
import { JobPostsService } from './job_posts.service';
import { CreateJobPostDto } from './dto/create-job_post.dto';
import { UpdateJobPostDto } from './dto/update-job_post.dto';
import { AuthGuard } from 'src/users/user.guard';

@Controller('job-posts')
export class JobPostsController {
  constructor(private readonly jobPostsService: JobPostsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req, @Body() createJobPostDto: CreateJobPostDto) {
    return this.jobPostsService.create(req, createJobPostDto);
  }

  @Get()
  findAll() {
    return this.jobPostsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobPostsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobPostDto: UpdateJobPostDto) {
    return this.jobPostsService.update(+id, updateJobPostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobPostsService.remove(+id);
  }
}
