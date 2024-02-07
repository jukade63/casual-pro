import { JobPost } from 'src/job_posts/entities/job_post.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';


export enum ApplicationStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

@Entity()
export class Applications extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @Column({ type: 'enum', enum: ApplicationStatus })
  status: ApplicationStatus;

  @ManyToOne(() => Worker, (worker) => worker.applications)
  @JoinColumn()
  worker: Worker;

  @ManyToOne(() => JobPost, (jobPost) => jobPost.applications)
  @JoinColumn()
  jobPost: JobPost;

}

