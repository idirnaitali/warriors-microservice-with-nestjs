import { MiddlewareConsumer, Module, NestMiddleware, NestModule, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelModule } from './model/model.module';
import { DtoModule } from './dto/dto.module';
import { ServiceModule } from './service/service.module';
import { ControllerModule } from './controller/controller.module';
import { APP_PIPE } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import { WarriorsController } from './controller/warriors.controller';
import { TraceIdMiddleware } from './middleware/trace-id.middleware';

@Module({
  imports: [
    // ------------------ ORM config --------------------
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'pass',
      database: 'nest',
      autoLoadEntities: true,
      synchronize: true,
      // logging: 'all',
      cli: {
        migrationsDir: 'db.migration',
        entitiesDir: 'src/entities',
      },
    }),
    // ------------------ LOGGER config ------------------
    LoggerModule.forRoot({ pinoHttp: { useLevelLabels: true, levelVal: 100 } }),
    // ------------------ Modules ------------------------
    ModelModule,
    DtoModule,
    ServiceModule,
    ControllerModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TraceIdMiddleware)
      .forRoutes(WarriorsController);
  }
}
