import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

// An entity is a TypeScript class that represents a data model
//in your application. It often corresponds to a table in a
//relational database or a document in a NoSQL database.

@Entity()
@Unique(['uniqueKey'])
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

  @Column({ name: 'uniqueKey' })
  uniqueKey: string;

  @Column()
  description: string;
}
