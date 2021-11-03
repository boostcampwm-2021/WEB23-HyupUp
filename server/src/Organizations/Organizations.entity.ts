import Users from '../Users/Users.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ORGANIZATIONS' })
export default class Organizations {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'ROOM' })
  room!: string;

  @OneToMany(() => Users, (users) => users.id)
  users!: Users[];
}
