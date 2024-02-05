import { Business } from 'src/businesses/entities/business.entity';
import { AbstractEntity } from 'src/database/Abstract.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, BeforeInsert, OneToOne, JoinColumn, AfterInsert, } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as argon from 'argon2';

export enum UserType {
  Worker = 'worker',
  Business = 'business',
}

@Entity()
export class User extends AbstractEntity<User> {
 
  @Column()
  username: string;

  @Exclude()
  @Column({ select: false })
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: UserType, })
  user_type: UserType;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  img_url: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon.hash(this.password);
  }

  @AfterInsert()
  async createWorker() {
    const worker = new Worker();
    worker.user_id = this.id; 
    await worker.save();
  }

}

