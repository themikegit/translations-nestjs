import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Structure {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  key: string;

  @Column()
  title: string;

  @Column()
  description: string;
}
