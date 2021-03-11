import { Module } from '@nestjs/common';
import { WarriorDto } from './warrior.dto';

@Module({
  imports: [WarriorDto],
})
export class DtoModule {}
