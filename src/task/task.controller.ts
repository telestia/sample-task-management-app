import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateNewTaskDto } from './dto/create-new-task.dto';
import { TaskEntity } from './model/task.entity';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { FilterAndSearchDto } from './dto/filter-and-search.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createNewTask(
    @Body() createNewTaskDto: CreateNewTaskDto,
  ): Promise<TaskEntity> {
    return this.taskService.createNewTask(createNewTaskDto);
  }

  @Get()
  async getAllTasks(
    @Query() filterAndSearchDto: FilterAndSearchDto,
  ): Promise<TaskEntity[]> {
    if (Object.keys(filterAndSearchDto).length) {
      // Eger herhangi bir filtre gonderildiyse burasi caliscak
      return this.taskService.getTaskWithFilter(filterAndSearchDto);
    } else {
      return this.taskService.getAllTasks();
    }
  }

  @Post('/update/status')
  async updateTaskStatus(
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<TaskEntity> {
    return this.taskService.updateTaskStatus(updateTaskStatusDto);
  }
}
