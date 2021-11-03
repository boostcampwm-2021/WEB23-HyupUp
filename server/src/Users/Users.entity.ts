import Organizations from '@/Organizations/Organizations.entity';
import Tasks from '@/Tasks/Tasks.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'USERS' })
export default class Users {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'JOB' })
  job!: number;

  @Column({ name: 'NAME' })
  name!: number;

  @Column({ name: 'EMAIL' })
  email!: number;

  @Column({ name: 'IMAGE_URL' })
  imageURL!: number;

  @Column({ name: 'ADMIN' })
  admin!: number;

  @Column({ name: 'ACCESS_TOKEN' })
  accessToken!: number;

  @Column({ name: 'REFRESH_TOKEN' })
  refreshToken!: number;

  @ManyToOne(() => Organizations, (org) => org.id)
  org!: Organizations;

  @OneToMany(() => Tasks, (tasks) => tasks.id)
  tasks!: Tasks[];
}
