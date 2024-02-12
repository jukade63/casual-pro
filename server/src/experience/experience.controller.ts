import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Post()
  create(@Body() createExperienceDto: CreateExperienceDto) {
    return this.experienceService.create(createExperienceDto);
  }

  @Get(':workerId')
  findAll(@Param('workerId', ParseIntPipe) workerId: number) {
    return this.experienceService.findAll(workerId);
  }

  @Get(':id/:workerId')
  findOne(@Param('id', ParseIntPipe) id: number,
  @Param('workerId', ParseIntPipe) workerId: number) {
    return this.experienceService.findOne(id, workerId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExperienceDto: UpdateExperienceDto
  ) {
    return this.experienceService.update(id, updateExperienceDto);
  }

  @Delete(':id/:workerId')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Param('workerId', ParseIntPipe) workerId: number) {
    return this.experienceService.remove(id, workerId);
  }
}
