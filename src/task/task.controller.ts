import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

// The controller is responsible for handling incoming HTTP requests,
//  processing them, and returning an appropriate response.
// It interacts with the service to perform business logic.

@Controller('task')
// @UseGuards(AuthGuard())
export class TaskController {
  constructor(private tasksService: TaskService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  @Get('/translations/:lang')
  getTranslations(@Param('lang') lang: string) {
    return this.tasksService.getTranslations(lang);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('/:id')
  getTaskByUuid(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() createTaskBody: CreateTaskDto,
  ): Promise<Task> {
    return this.tasksService.updateTranslationOb(id, createTaskBody);
  }
}
