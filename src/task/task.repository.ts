import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';

import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

import { GetTaskFilterDto } from './dto/get-task-filter.dto';

// The repository is a class responsible for encapsulating the logic
//for querying, inserting, updating, and deleting records in
//the database for a specific entity. SO ** DEVELOPMENT LOGIC ***

// NestJS often uses TypeORM, which is an Object-Relational Mapping (ORM)
//library, and repositories are provided by TypeORM to interact with the database.

///SERVICE
// A service is a class that contains the *** BUSINSS LOGIC *** of your application.
//  It may use one or more repositories to interact with the database.

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }
  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    const query = this.createQueryBuilder('task');

    if (filterDto.missing) {
      query.andWhere(`task.${filterDto.missing} = :lang`, { lang: '' });
    }
    const tasks = await query.getMany();
    return tasks;
  }
  async getTranslations(lang) {
    const transformedObject = {};
    const tasks = await this.find();
    tasks.forEach((item) => {
      const { app, component, key, en, de, rs } = item;

      if (!transformedObject[app]) {
        transformedObject[app] = {};
      }

      if (!transformedObject[app][component]) {
        transformedObject[app][component] = {};
      }

      if (lang === 'de') {
        if (de) {
          transformedObject[app][component][key] = de.toLowerCase();
        } else {
          transformedObject[app][component][key] = '!' + en.toLowerCase();
        }
      }

      if (lang === 'en') {
        transformedObject[app][component][key] = en.toLowerCase();
      }

      if (lang === 'rs') {
        transformedObject[app][component][key] = rs.toLowerCase();
      }

      // transformedObject[app][component][key] =
      //   lang === 'de' ? de.toLowerCase() : en.toLowerCase();
    });

    return transformedObject;
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { app, component, key, en, de, rs, uniqueKey, description } =
      createTaskDto;
    const task = this.create({
      app,
      component,
      key,
      en,
      de,
      rs,
      uniqueKey,
      description,
    });
    await this.save(task);
    return task;
  }
}
