// src/entities/business.entity.ts
import { JobPost } from 'src/job_posts/entities/job_post.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class Business extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  industry: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  profile_img: string;

  @OneToMany(() => JobPost, (jobPost) => jobPost.business)
  jobPosts: JobPost[];
}

