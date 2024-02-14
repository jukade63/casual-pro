import { Worker } from 'src/workers/entities/worker.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Skills extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  skill_name: string;

  @Column({nullable: true})
  certification: string;

  @Column({ nullable: true })
  cert_link: string;

  @ManyToOne(() => Worker, (worker) => worker.skills, {onDelete: 'CASCADE'})
  @JoinColumn()
  worker: Worker;
}

