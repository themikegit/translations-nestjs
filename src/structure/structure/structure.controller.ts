import { Controller, Get } from '@nestjs/common';
import { StructureService } from './structure.service';

@Controller('structure')
export class StructureController {
  constructor(private ss: StructureService) {}

  @Get()
  getStructures() {
    return this.ss.getStructure();
  }
}
