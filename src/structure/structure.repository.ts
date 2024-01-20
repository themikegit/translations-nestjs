import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Structure } from './structure.entity';

@Injectable()
export class StructureRepository extends Repository<Structure> {
  constructor(private dataSource: DataSource) {
    super(Structure, dataSource.createEntityManager());
  }

  async getStructure() {
    const structure = await this.find();
    return structure;
  }

  async createStructure(createStructureDto) {
    const { key, title, description } = createStructureDto;
    const structure = this.create({
      key,
      title,
      description,
    });
    await this.save(structure);
  }
}
