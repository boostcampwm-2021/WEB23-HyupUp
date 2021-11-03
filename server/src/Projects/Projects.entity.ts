import Epics from '@/Epics/Epics.entity';
import Users from '@/Users/Users.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'PROJECTS' })
export default class Projects {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NAME' })
  name!: number;

  @ManyToMany(() => Users)
  @JoinTable({ name: 'USERS_PROJECTS' })
  users!: Users[];

  @OneToMany(() => Epics, (epics) => epics.id)
  epics!: Epics[];
}
