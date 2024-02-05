// src/entities/education.entity.ts
import { Worker } from 'src/workers/entities/worker.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';

@Entity()
export class Education extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  institution: string;

  @Column()
  degree: string;

  @Column()
  major: string;

  @Column({ type: 'date' })
  grad_date: Date;

  @ManyToOne(() => Worker, (worker) => worker.education)
  worker: Worker;
}

