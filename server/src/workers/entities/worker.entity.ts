import { Applications } from 'src/applications/entities/application.entity';
import { Education } from 'src/education/entities/education.entity';
import { Experience } from 'src/experience/entities/experience.entity';
import { Jobs } from 'src/jobs/entities/job.entity';
import { Skills } from 'src/skills/entities/skill.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class Worker extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ type: 'timestamptz', nullable: true })
  available_from: string;

  @Column({ type: 'timestamptz', nullable: true })
  available_to: string;

  @OneToMany(() => Experience, (experience) => experience.worker)
  experiences: Experience[];

  @OneToMany(() => Skills, (skills) => skills.worker)
  skills: Skills[];

  @OneToMany(() => Education, (education) => education.worker)
  education: Education[];

  @OneToMany(() => Applications, (application) => application.worker)
  applications: Applications[];

  @OneToMany(() => Jobs, (job) => job.worker)
  jobs: Jobs[];

}
