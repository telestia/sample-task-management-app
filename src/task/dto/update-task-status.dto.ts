import { TaskStatus } from '../model/task-status';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTaskStatusDto {
  @IsNotEmpty()
  @IsString()
  id: string;
  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus;
}
