import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Request } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { AuthGuard } from 'src/users/user.guard';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  // @Get(':workerId')
  // findFavoritesByWorkerId(@Param('workerId', ParseIntPipe) workerId: number) {
  //   return this.jobsService.findAllByWorkerId(workerId);
  // }

  @UseGuards(AuthGuard)
  @Get('favorites')
  findFavorites(@Request() req) {
    return this.jobsService.findFavorites(req);
  }

  @Patch(':jobId')
  update(@Param('jobId', ParseIntPipe) jobId: number, @Body() updateJobDto: UpdateJobDto) {
    console.log(updateJobDto);
    
    return this.jobsService.updateJobApplication(jobId, updateJobDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }
}
