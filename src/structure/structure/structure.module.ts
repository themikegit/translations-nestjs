import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { StructureService } from './structure.service';
import { StructureController } from './structure.controller';

@Module({
  imports: [AuthModule, ConfigModule],
  controllers: [StructureController],
  providers: [StructureService],
})
@Module({})
export class StructureModule {}
