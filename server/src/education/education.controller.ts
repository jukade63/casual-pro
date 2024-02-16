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
    console.log(createEducationDto);
    
    return this.educationService.create(createEducationDto);
  }

  @Get(':userId')
  findAll(@Param('userId', ParseIntPipe) userId: number) {
    return this.educationService.findAll(userId);
  }

  @Get(':id/:userId')
  findOne(@Param('id', ParseIntPipe) id: number,
  @Param('workerId', ParseIntPipe) workerId: number) {
    return this.educationService.findOne(id, workerId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEducationDto: UpdateEducationDto
  ) {
    return this.educationService.update(id, updateEducationDto);
  }

  @Delete(':id/:userId')
  remove(
    @Param('id') id: string,
    @Param('userId') userId: string) {
    return this.educationService.remove(id, userId);
  }
}
