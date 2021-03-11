import { Module } from '@nestjs/common';
import { WarriorsController } from './warriors.controller';
import { ServiceModule } from '../service/service.module';
import { ModelModule } from '../model/model.module';
import { HealthCheckController } from './health-check/health-check.controller';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [ServiceModule, ModelModule, TerminusModule],
  controllers: [WarriorsController, HealthCheckController],
})
export class ControllerModule {}
