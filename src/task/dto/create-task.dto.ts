import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  key: string;

  @IsNotEmpty()
  app: string;

  @IsNotEmpty()
  component: string;

  en: string;

  de: string;

  rs: string;

  @IsNotEmpty()
  uniqueKey: string;

  description: string;
}
