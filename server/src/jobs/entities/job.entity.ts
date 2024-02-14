import { JobPost } from 'src/job_posts/entities/job_post.entity';
import { Ratings } from 'src/ratings/entities/rating.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';


@Entity()
export class Jobs extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  completed: boolean;

  @OneToOne(() => JobPost, (jobPost) => jobPost.job, {onDelete: 'SET NULL'})
  @JoinColumn()
  jobPost: JobPost;

  @ManyToMany(() => Worker, (worker) => worker.jobs, {onDelete: 'SET NULL'})
  @JoinTable()
  workers: Worker[]

  @OneToMany(() => Ratings, (rating) => rating.job)
  ratings: Ratings[];

}

