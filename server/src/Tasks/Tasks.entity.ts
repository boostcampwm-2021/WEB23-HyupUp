import Stories from '../Stories/Stories.entity';
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
import Projects from '../Projects/Projects.entity';

@Entity({ name: 'TASKS' })
export default class Tasks {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NAME' })
  name!: string;

  @Column({ name: 'STATUS', type: 'boolean' })
  status!: boolean;

  @ManyToOne(() => Projects, (projects) => projects.id)
  @JoinColumn({ name: 'PROJECT_ID' })
  projects!: Projects;

  @ManyToOne(() => Stories, (stories) => stories.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'STORY_ID' })
  stories!: Stories;

  @ManyToOne(() => Users, (users) => users.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'USER_ID' })
  users!: Users;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
