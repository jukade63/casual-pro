import { Applications } from 'src/applications/entities/application.entity';
import { AbstractEntity } from 'src/database/Abstract.entity';
import { Education } from 'src/education/entities/education.entity';
import { Experience } from 'src/experience/entities/experience.entity';
import { Jobs } from 'src/jobs/entities/job.entity';
import { Skills } from 'src/skills/entities/skill.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Worker extends AbstractEntity<Worker> {

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ type: 'timestamptz', nullable: true })
  availableFrom: string;

  @Column({ type: 'timestamptz', nullable: true })
  availableTo: string;

  @OneToMany(() => Experience, (experience) => experience.worker)
  experiences: Experience[];

  @OneToMany(() => Skills, (skills) => skills.worker)
  skills: Skills[];

  @OneToMany(() => Education, (education) => education.worker)
  education: Education[];

  @OneToMany(() => Applications, (application) => application.worker)
  applications: Applications[];

  @ManyToMany(() => Jobs)
  jobs: Jobs[];
}

