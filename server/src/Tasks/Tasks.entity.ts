import Stories from '../Stories/Stories.entity';
import Users from '../Users/Users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'TASKS' })
export default class Tasks {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NAME' })
  name!: number;

  @Column({ name: 'STATUS' })
  status!: boolean;

  @ManyToOne(() => Stories, (stories) => stories.id)
  stories!: Stories;

  @ManyToOne(() => Users, (users) => users.id)
  users!: Users;
}
