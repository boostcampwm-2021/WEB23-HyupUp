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

  @Column({ name: 'ACCESS_TOKEN' })
  accessToken!: string;

  @Column({ name: 'REFRESH_TOKEN' })
  refreshToken!: string;

  @ManyToOne(() => Organizations, (org) => org.id)
  @JoinColumn({ name: 'ORGANIZATION_ID' })
  org!: Organizations;

  @OneToMany(() => Tasks, (tasks) => tasks.id)
  tasks!: Tasks[];
  @ManyToMany(() => Projects)
  @JoinTable({
    name: 'USERS_PROJECTS',
    inverseJoinColumn: { name: 'PROJECT_ID', referencedColumnName: 'id' },
    joinColumn: { name: 'USER_ID', referencedColumnName: 'id' },
  })
  projects!: Projects[];
}
