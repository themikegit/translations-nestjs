import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksRepository } from './task.repository';
import { Task } from './task.entity';
import { SseController } from 'src/sse/sse.controler';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule, ConfigModule],
  controllers: [TaskController, SseController],
  providers: [TaskService, TasksRepository],
})
export class TaskModule {}
