import { AbstractEntity } from 'src/database/Abstract.entity';
import { JobPost } from 'src/job_posts/entities/job_post.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';


export enum ApplicationStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

@Entity()
export class Applications extends AbstractEntity<Applications> {

  @CreateDateColumn({ type: 'timestamptz' })
  appliedAt: Date;

  @Column({ type: 'enum', enum: ApplicationStatus, default: ApplicationStatus.Pending })
  status: ApplicationStatus;

  @ManyToOne(() => Worker, (worker) => worker.applications, {onDelete: 'CASCADE'})
  @JoinColumn()
  worker: Worker;

  @ManyToOne(() => JobPost, (jobPost) => jobPost.applications, {onDelete: 'CASCADE'})
  @JoinColumn()
  jobPost: JobPost;

}

