import { Worker } from 'src/workers/entities/worker.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Skills extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Worker, (worker) => worker.skills)
  @JoinColumn()
  worker: Worker;

  @Column()
  skill_name: string;

  @Column()
  certification: string;

  @Column({ nullable: true })
  cert_link: string;
}

