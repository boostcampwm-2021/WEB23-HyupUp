import Epics from '../Epics/Epics.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'PROJECTS' })
export default class Projects {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NAME' })
  name!: string;

  @OneToMany(() => Epics, (epics) => epics.id)
  epics!: Epics[];
}
