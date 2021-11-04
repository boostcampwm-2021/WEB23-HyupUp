import Stories from '../Stories/Stories.entity';
import Users from '../Users/Users.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'TASKS' })
export default class Tasks {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NAME' })
  name!: string;

  @Column({ name: 'STATUS', type: 'boolean' })
  status!: boolean;

  @ManyToOne(() => Stories, (stories) => stories.id)
  @JoinColumn({ name: 'STORY_ID' })
  stories!: Stories;

  @ManyToOne(() => Users, (users) => users.id)
  @JoinColumn({ name: 'USER_ID' })
  users!: Users;
}
