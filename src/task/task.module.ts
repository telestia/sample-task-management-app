import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './model/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'harun-task-management',
      entities: ['dist/task/model/*.entity.js'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([TaskEntity]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
