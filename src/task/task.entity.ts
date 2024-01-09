import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';

// An entity is a TypeScript class that represents a data model
//in your application. It often corresponds to a table in a
//relational database or a document in a NoSQL database.

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  app: string;

  @Column()
  component: string;

  @Column()
  key: string;

  @Column()
  en: string;

  @Column()
  de: string;

  @Column()
  rs: string;

  @Column()
  uniqueKey: string;

  @Column()
  description: string;
}
