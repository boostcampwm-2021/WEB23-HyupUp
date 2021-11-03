import Epics from '@/Epics/Epics.entity';
import Tasks from '@/Tasks/Tasks.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
  name!: number;

  @Column({ name: 'STATUS', type: 'enum', default: StatusEnum.TODO })
  status!: StatusEnum;

  @ManyToOne(() => Epics, (epics) => epics.id)
  epics!: Epics;

  @OneToMany(() => Tasks, (tasks) => tasks.id)
  tasks!: Tasks[];
}
