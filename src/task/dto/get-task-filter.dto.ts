import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
} from 'class-validator/types/decorator/decorators';
import { TaskStatus } from '../task-status.enum';

export class GetTaskFilterDto {
  missing: string;
}
