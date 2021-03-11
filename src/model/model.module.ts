import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarriorEntity } from './warrior.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WarriorEntity])],
  exports: [TypeOrmModule],
})
export class ModelModule {}
