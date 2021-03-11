import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
