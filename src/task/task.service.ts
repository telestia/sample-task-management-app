import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './model/task.entity';
import { Repository } from 'typeorm';
import { CreateNewTaskDto } from './dto/create-new-task.dto';
import { TaskStatus } from './model/task-status';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { FilterAndSearchDto } from './dto/filter-and-search.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private userEntityRepository: Repository<TaskEntity>,
  ) {}

  async createNewTask(createNewTaskDto: CreateNewTaskDto): Promise<TaskEntity> {
    const { title, description } = createNewTaskDto;
    const task = this.userEntityRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    return await this.userEntityRepository.save(task);
  }

  async getAllTasks(): Promise<TaskEntity[]> {
    return await this.userEntityRepository.find();
  }

  async getTaskWithFilter(
    filterAndSearchDto: FilterAndSearchDto,
  ): Promise<TaskEntity[]> {
    const { status, search } = filterAndSearchDto;
    let tasks = await this.getAllTasks();
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
    return tasks;
  }

  async updateTaskStatus(
    updateTaskStatus: UpdateTaskStatusDto,
  ): Promise<TaskEntity> {
    const { id, status } = updateTaskStatus;
    console.log(id);
    const task = await this.userEntityRepository.findOne({
      where: {
        id,
      },
    });
    task.status = status;
    await this.userEntityRepository.save(task);
    return task;
  }
}
