import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) { }

  @Post()
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(createSkillDto);
  }

  @Get(':workerId')
  findAll(@Param('workerId', ParseIntPipe) workerId: number) {
    return this.skillsService.findAll(workerId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number,
    @Param('workerId', ParseIntPipe) workerId: number
  ) {
    return this.skillsService.findOne(id, workerId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSkillDto: UpdateSkillDto
  ) {
    return this.skillsService.update(id, updateSkillDto);
  }

  @Delete(':id/:workerId')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Param('workerId', ParseIntPipe) workerId: number
  ) {
    return this.skillsService.remove(id, workerId);
  }
}
