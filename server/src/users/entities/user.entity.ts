import { AbstractEntity } from 'src/database/Abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, BeforeInsert, OneToOne, JoinColumn, AfterInsert, } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as argon from 'argon2';
import { Business } from 'src/businesses/entities/business.entity';

export enum UserType {
  Worker = 'worker',
  Business = 'business',
}

@Entity()
export class User extends AbstractEntity<User> {
 
  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: UserType, })
  userType: UserType;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  imgUrl: string;

  @OneToOne(() => Business, business => business.user)
  business: Business;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon.hash(this.password);
  }

}

