import { Module } from '@nestjs/common';
import { WarriorsService } from './warriors.service';
import { ModelModule } from '../model/model.module';

@Module({
  imports: [ModelModule],
  providers: [WarriorsService],
  exports: [WarriorsService],
})
export class ServiceModule {}
