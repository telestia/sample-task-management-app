import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateNewTaskDto } from './dto/create-new-task.dto';
import { TaskEntity } from './model/task.entity';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { FilterAndSearchDto } from './dto/filter-and-search.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorator/get-user-decorator';
import { UserEntity } from '../auth/model/user.entity';
import { use } from "passport";

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createNewTask(
    @Body() createNewTaskDto: CreateNewTaskDto,
    @GetUser() user: UserEntity,
  ): Promise<TaskEntity> {
    return this.taskService.createNewTask(createNewTaskDto, user);
  }

  @Get()
  async getAllTasks(
    @Query() filterAndSearchDto: FilterAndSearchDto,
    @GetUser() user: UserEntity,
  ): Promise<TaskEntity[]> {
    if (Object.keys(filterAndSearchDto).length) {
      // Eger herhangi bir filtre gonderildiyse burasi caliscak
      return this.taskService.getTaskWithFilter(filterAndSearchDto, user);
    } else {
      return this.taskService.getAllTasks(user);
    }
  }

  @Post('/update/status')
  async updateTaskStatus(
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: UserEntity,
  ): Promise<TaskEntity> {
    return this.taskService.updateTaskStatus(updateTaskStatusDto, user);
  }
}
