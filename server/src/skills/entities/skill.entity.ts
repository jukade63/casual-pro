import { Worker } from 'src/workers/entities/worker.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';

export enum SkillLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
}
@Entity()
export class Skills extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  skillName: string;

  @Column({nullable: true})
  skillLevel: SkillLevel;

  @Column({nullable: true})
  certification: string;

  @Column({ nullable: true })
  certLink: string;

  @ManyToOne(() => Worker, (worker) => worker.skills, {onDelete: 'CASCADE'})
  worker: Worker;
}

