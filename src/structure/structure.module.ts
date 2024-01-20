import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { StructureService } from './structure.service';
import { StructureController } from './structure.controller';
import { StructureRepository } from './structure.repository';
import { Structure } from './structure.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Structure]), AuthModule, ConfigModule],
  controllers: [StructureController],
  providers: [StructureService, StructureRepository],
})
@Module({})
export class StructureModule {}
