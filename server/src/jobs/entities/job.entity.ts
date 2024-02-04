import { JobPost } from 'src/job_posts/entities/job_post.entity';
import { Ratings } from 'src/ratings/entities/rating.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToOne } from 'typeorm';


@Entity()
export class Jobs extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Completed: boolean;

  @ManyToOne(() => JobPost, (jobPost) => jobPost.jobs)
  jobPost: JobPost;

  @ManyToOne(() => Worker, (worker) => worker.jobs)
  worker: Worker;

  @ManyToOne(() => Ratings, (rating) => rating.job)
  ratings: Ratings[];

}

