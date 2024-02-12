import { Applications } from 'src/applications/entities/application.entity';
import { Business } from 'src/businesses/entities/business.entity';
import { Jobs } from 'src/jobs/entities/job.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';

export enum JobType {
  Casual = 'casual',
  PartTime = 'part-time',
  Temporary = 'temporary',
}

export enum Status {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

@Entity()
export class JobPost extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Business, (business) => business.jobPosts)
  @JoinColumn()
  business: Business;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  requirements: string;

  @Column()
  location: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  startDate: Date; 

  @Column({ type: 'timestamptz' })
  endDate: Date; 

  @Column({ type: 'enum', enum: JobType })
  jobType: JobType;

  @Column({ type: 'decimal' })
  paymentAmount: number;

  @Column()
  category: string;

  @Column({ default: true })
  available: boolean;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @OneToMany(() => Applications, (application) => application.jobPost)
  applications: Applications[];

  @OneToOne(() => Jobs)
  job: Jobs
  
}
