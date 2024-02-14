import { Worker } from 'src/workers/entities/worker.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';

export enum JobType {
  FullTime = 'full-time',
  PartTime = 'part-time',
  Temporary = 'temporary',
}

@Entity()
export class Experience extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: JobType })
  jobType: JobType;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToOne(() => Worker, (worker) => worker.experiences, {onDelete: 'CASCADE'})
  worker: Worker;
}

