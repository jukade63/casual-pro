import { Worker } from 'src/workers/entities/worker.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';

enum JobType {
  FullTime = 'full-time',
  PartTime = 'part-time',
  Temporary = 'temporary',
}

@Entity()
export class Experience extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Worker, (worker) => worker.experiences)
  worker: Worker;

  @Column({ type: 'enum', enum: JobType })
  job_type: JobType;

  @Column()
  date: string;

  @Column()
  duration: string;
}

