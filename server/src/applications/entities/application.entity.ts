import { JobPost } from 'src/job_posts/entities/job_post.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';


enum ApplicationStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

@Entity()
export class Applications extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  application_date: Date;

  @Column({ type: 'enum', enum: ApplicationStatus })
  status: ApplicationStatus;

  @ManyToOne(() => Worker, (worker) => worker.applications)
  worker: Worker;

  @ManyToOne(() => JobPost, (jobPost) => jobPost.applications)
  jobPost: JobPost;

}

