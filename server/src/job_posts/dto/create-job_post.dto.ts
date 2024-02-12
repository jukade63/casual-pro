import { IsString, IsNotEmpty, IsEnum, IsNumber, IsBoolean, IsDateString } from 'class-validator';
import { JobType, Status } from '../entities/job_post.entity'; 
import { Business } from 'src/businesses/entities/business.entity';

export class CreateJobPostDto {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  requirements: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @IsEnum(JobType)
  @IsNotEmpty()
  jobType: JobType;

  @IsNumber()
  @IsNotEmpty()
  paymentAmount: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsBoolean()
  @IsNotEmpty()
  available: boolean;

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @IsNotEmpty()
  business: Business
}

