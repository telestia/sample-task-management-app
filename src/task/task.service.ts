import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './model/task.entity';
import { Repository } from 'typeorm';
import { CreateNewTaskDto } from './dto/create-new-task.dto';
import { TaskStatus } from './model/task-status';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { FilterAndSearchDto } from './dto/filter-and-search.dto';
import { UserEntity } from '../auth/model/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private userEntityRepository: Repository<TaskEntity>,
  ) {}

  async createNewTask(
    createNewTaskDto: CreateNewTaskDto,
    user: UserEntity,
  ): Promise<TaskEntity> {
    const { title, description } = createNewTaskDto;
    const task = this.userEntityRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    return await this.userEntityRepository.save(task);
  }

  async getAllTasks(user: UserEntity): Promise<TaskEntity[]> {
    const tasks = await this.userEntityRepository.find({
      where: {
        user,
      },
    });
    if (tasks.length == 0) {
      throw new NotFoundException();
    }
    return tasks;
  }

  async getTaskWithFilter(
    filterAndSearchDto: FilterAndSearchDto,
    user: UserEntity,
  ): Promise<TaskEntity[]> {
    const { status, search } = filterAndSearchDto;
    let tasks = await this.getAllTasks(user);
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        return (
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase())
        );
      });
    }
    if (!tasks) {
      throw new NotFoundException();
    }
    return tasks;
  }

  async updateTaskStatus(
    updateTaskStatus: UpdateTaskStatusDto,
    user: UserEntity,
  ): Promise<TaskEntity> {
    const { id, status } = updateTaskStatus;
    console.log(id);
    const task = await this.userEntityRepository.findOne({
      where: {
        id,
        user,
      },
    });
    task.status = status;
    await this.userEntityRepository.save(task);
    return task;
  }
}
