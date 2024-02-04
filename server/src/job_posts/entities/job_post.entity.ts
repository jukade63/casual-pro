import { Applications } from 'src/applications/entities/application.entity';
import { Business } from 'src/businesses/entities/business.entity';
import { Jobs } from 'src/jobs/entities/job.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, OneToOne } from 'typeorm';

enum JobType {
  Casual = 'casual',
  PartTime = 'part-time',
  Temporary = 'temporary',
}

enum Status {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

@Entity()
export class JobPost extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Business, (business) => business.jobPosts)
  business: Business;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  requirements: string;

  @Column()
  location: string;

  @Column({ type: 'timestamptz' })
  posted_date: Date;

  @Column({ type: 'timestamptz' })
  expiry_date: Date;

  @Column({ type: 'enum', enum: JobType })
  job_type: JobType;

  @Column({ type: 'decimal' })
  payment_amount: number;

  @Column()
  category: string;

  @Column({ default: true })
  available: boolean;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @OneToMany(() => Applications, (application) => application.jobPost)
  applications: Applications[];

  @OneToOne(() => Jobs)
  jobs: Jobs
  
}
