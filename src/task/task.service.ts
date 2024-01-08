import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { Subject } from 'rxjs';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  public taskEvenet = new Subject();

  getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  getTranslations(lang: string) {
    return this.tasksRepository.getTranslations(lang);
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    this.taskEvenet.next(createTaskDto);
    return this.tasksRepository.createTask(createTaskDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException('Nije pronadjen RS');
    }
    return found;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('no task like that');
    }
  }

  async updateTranslationOb(
    id: string,
    translationObBody: CreateTaskDto,
  ): Promise<Task> {
    const task = await this.getTaskById(id);

    await this.tasksRepository.save(translationObBody);
    return task;
  }
}
