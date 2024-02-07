import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNumber, IsOptional, IsArray, ArrayNotEmpty, ArrayMinSize } from 'class-validator';
import { CreateJobDto } from './create-job.dto';

export class UpdateJobDto extends PartialType(CreateJobDto) {
  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @IsOptional()
  @IsNumber()
  jobPostId?: number;

  @IsOptional()
  @IsNumber()
  applicationId?: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  workerIds?: number[]; 
}