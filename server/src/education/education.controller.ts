import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ParseIntPipe } from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Controller('education')
export class EducationController {

  constructor(
    private readonly educationService: EducationService,
  ) { }

  @Post()
  create(@Body() createEducationDto: CreateEducationDto) {
    return this.educationService.create(createEducationDto);
  }

  @Get(':workerId')
  findAll(@Param('workerId', ParseIntPipe) workerId: number) {
    return this.educationService.findAll(workerId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.educationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEducationDto: UpdateEducationDto) {
    return this.educationService.update(id, updateEducationDto);
  }

  @Delete(':id/:workerId')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Param('workerId', ParseIntPipe) workerId: number) {
    return this.educationService.remove(id, workerId);
  }
}
