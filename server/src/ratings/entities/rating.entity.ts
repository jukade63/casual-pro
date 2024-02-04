import { Jobs } from 'src/jobs/entities/job.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';


@Entity()
export class Ratings extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Jobs, (job) => job.ratings)
  job: Jobs;

  @Column({ type: 'decimal' })
  rating_value: number;

  @Column('text')
  review_content: string;
}

