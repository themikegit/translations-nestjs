import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TasksRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

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

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const duplicate = await this.tasksRepository.findOne({
      where: { uniqueKey: createTaskDto.uniqueKey },
    });

    if (duplicate) {
      throw new HttpException('Duplicate key value', HttpStatus.CONFLICT);
    }
    const result = await this.tasksRepository.createTask(createTaskDto);
    // this.taskEvenet.next(createTaskDto)

    return result;
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
  ): Promise<CreateTaskDto> {
    const task = await this.getTaskById(id);
    await this.tasksRepository.save(translationObBody);
    return translationObBody;
  }
}
