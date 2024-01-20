import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StructureRepository } from './structure.repository';

// C ontroller
// S service
// R epository

@Injectable()
export class StructureService {
  constructor(
    @InjectRepository(StructureRepository)
    private structureRepository: StructureRepository,
  ) {}

  getStructure() {
    return this.structureRepository.getStructure();
  }

  createStructure(body) {
    return this.structureRepository.createStructure(body);
  }
}
