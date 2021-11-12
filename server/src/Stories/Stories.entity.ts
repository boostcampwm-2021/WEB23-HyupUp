import Epics from '../Epics/Epics.entity';
import Tasks from '../Tasks/Tasks.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Projects from '..//Projects/Projects.entity';

export enum StatusEnum {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Entity({ name: 'STORIES' })
export default class Stories {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NAME' })
  name!: string;

  @Column({ name: 'STATUS', type: 'enum', default: StatusEnum.TODO, enum: StatusEnum })
  status!: StatusEnum;

  @ManyToOne(() => Projects, (projects) => projects.id)
  @JoinColumn({ name: 'PROJECT_ID' })
  projects!: Projects;

  @ManyToOne(() => Epics, (epics) => epics.id)
  @JoinColumn({ name: 'EPIC_ID' })
  epics!: Epics;

  @OneToMany(() => Tasks, (tasks) => tasks.id)
  tasks!: Tasks[];
}
