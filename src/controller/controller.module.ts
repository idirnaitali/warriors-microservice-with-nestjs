import { Module } from '@nestjs/common';
import { WarriorsController } from './warriors.controller';
import { ServiceModule } from '../service/service.module';
import { ModelModule } from '../model/model.module';

@Module({
  imports: [ServiceModule, ModelModule],
  controllers: [WarriorsController],
})
export class ControllerModule {}
