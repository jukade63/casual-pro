import { Business } from 'src/businesses/entities/business.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';

enum UserType {
  Worker = 'worker',
  Business = 'business',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: UserType })
  user_type: UserType;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  profile_img: string;

  @OneToMany(() => Worker, (worker) => worker.user)
  workers: Worker[];

  @OneToMany(() => Business, (business) => business.user)
  businesses: Business[];
}

