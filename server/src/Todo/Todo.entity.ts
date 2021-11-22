import Users from '../Users/Users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'TODO' })
export default class Todo {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NAME' })
  name!: string;

  @Column({ name: 'STATUS', type: 'boolean' })
  status!: boolean;

  @ManyToOne(() => Users, (users) => users.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'USER_ID' })
  users!: Users;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
