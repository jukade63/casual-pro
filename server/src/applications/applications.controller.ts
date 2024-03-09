import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { RoleGuard } from 'src/role/role.guard';
import { UserType } from 'src/users/entities/user.entity';
import { Role } from 'src/role/role.decorator';
import { AuthGuard } from 'src/users/user.guard';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) { }

  @Post(':jobPostId')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Role(UserType.Worker)
  create(@Request() req,
    @Param('jobPostId', ParseIntPipe) jobPostId: number
    ) {
    return this.applicationsService.create(req, jobPostId);
  }

  @Get()
  findAll() {
    return this.applicationsService.findAll();
  }

  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Role(UserType.Worker)
  @Get('worker/all')
  findAllByWorker(@Request() req) {
    return this.applicationsService.findAllByWorker(req);

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateApplicationDto: UpdateApplicationDto) {
    return this.applicationsService.update(id, updateApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationsService.remove(+id);
  }
}
