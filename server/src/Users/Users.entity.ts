import Organizations from '../Organizations/Organizations.entity';
import Tasks from '../Tasks/Tasks.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Projects from '../Projects/Projects.entity';
import Todo from '../Todo/Todo.entity';

@Entity({ name: 'USERS' })
export default class Users {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'JOB' })
  job!: string;

  @Column({ name: 'NAME' })
  name!: string;

  @Column({ name: 'EMAIL' })
  email!: string;

  @Column({ name: 'IMAGE_URL' })
  imageURL!: string;

  @Column({ name: 'ADMIN', type: 'boolean' })
  admin!: boolean;

  @Column({ name: 'PASSWORD' })
  password!: string;

  @ManyToOne(() => Organizations, (org) => org.id)
  @JoinColumn({ name: 'ORGANIZATION_ID' })
  org!: Organizations;

  @OneToMany(() => Tasks, (tasks) => tasks.id, { cascade: true })
  tasks!: Tasks[];
  @ManyToMany(() => Projects)
  @JoinTable({
    name: 'USERS_PROJECTS',
    inverseJoinColumn: { name: 'PROJECT_ID', referencedColumnName: 'id' },
    joinColumn: { name: 'USER_ID', referencedColumnName: 'id' },
  })
  projects!: Projects[];

  @OneToMany(() => Todo, (todo) => todo.id, { cascade: true })
  todo!: Todo[];
}
