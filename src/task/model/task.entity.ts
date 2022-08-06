import { Column, Entity } from 'typeorm';
import { TaskStatus } from './task-status';

@Entity()
export class Task {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
