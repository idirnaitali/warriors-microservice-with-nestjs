import { Controller, Get, HttpCode, HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import {
  DiskHealthIndicator,
  DNSHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

enum Unit {
  MO = 1024 * 1024 * 8,
  GO = 1024 * 1024 * 1024 * 8,
}

class MemorySize {
  private constructor(readonly value: number, unit: Unit) {
    this.value = value * unit;
  }

  static of(value: number, unit: Unit) {
    return new MemorySize(value, unit);
  }
}

@Controller()
export class HealthCheckController {
  constructor(
    private health: HealthCheckService,
    private dns: DNSHealthIndicator,
    private orm: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
  ) {
  }

  @Get('/health')
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.dns.pingCheck('warrior.com', 'http://localhost:3000/ping', { timeout: 800 }),

      () => this.dns.pingCheck('google', 'https://google.com', { timeout: 800 }),

      () => this.orm.pingCheck('database', { timeout: 1500 }),

      // The process should not have more than 100 MO allocated
      () => this.memory.checkRSS('memory_rss', MemorySize.of(100, Unit.MO).value),

      // The process should not use more than 50 MO memory
      () => this.memory.checkHeap('memory_heap', MemorySize.of(50, Unit.MO).value),

      // The used disk storage should not exceed 50 GB
      () => this.disk.checkStorage('storage_threshold', { threshold: MemorySize.of(100, Unit.GO).value, path: '/' }),

      // The used disk storage should not exceed 80% of the full disk size
      () => this.disk.checkStorage('storage_thresholdPercent', { thresholdPercent: 0.8, path: '/' }),
    ]);
  }

  @Get('/ping')
  ping() {
    if (Math.random() >= 0.5) {
      throw new HttpException('Service Unavailable', 503);
    }
    return { message: 'pong' };
  }
}
