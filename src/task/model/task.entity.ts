import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status';
import { UserEntity } from '../../auth/model/user.entity';
import { Exclude } from "class-transformer";

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne((type) => UserEntity, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true})
  user: UserEntity;
}
