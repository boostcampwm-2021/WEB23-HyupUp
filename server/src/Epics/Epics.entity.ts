import Projects from '../Projects/Projects.entity';
import Stories from '../Stories/Stories.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'EPICS' })
export default class Epics {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NAME' })
  name!: string;

  @Column({ name: 'START_AT' })
  startAt!: Date;

  @Column({ name: 'END_AT' })
  endAt!: Date;

  @Column('decimal', { name: 'ORDER', precision: 20, scale: 12 })
  order!: number;

  @ManyToOne(() => Projects, (projects) => projects.id)
  @JoinColumn({ name: 'PROJECT_ID' })
  projects!: Projects;

  @OneToMany(() => Stories, (stories) => stories.id, { cascade: true })
  stories!: Stories[];
}
