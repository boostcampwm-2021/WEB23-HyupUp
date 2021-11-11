import Users from '../Users/Users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'TODO' })
export default class Todo {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NAME' })
  name!: string;

  @Column({ name: 'STATUS', type: 'boolean' })
  status!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Users, (users) => users.id)
  @JoinColumn({ name: 'USER_ID' })
  users!: Users;
}
