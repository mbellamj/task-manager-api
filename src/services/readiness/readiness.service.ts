import { Injectable, Logger } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

import {
  memoryHeap,
  diskStoragethresholdPercent as thresholdPercent,
} from '@/common/constants/readiness.constants';

@Injectable()
export class ReadinessService {
  private readonly logger = new Logger(ReadinessService.name);

  constructor(
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
  ) {}

  check() {
    return this.health.check([
      () => this.checkDatabase(),
      () => this.checkDiskStorage(),
      () => this.checkMemoryUsage(),
    ]);
  }

  private checkDatabase() {
    this.logger.log('Checking database health...');
    return this.db.pingCheck('database', { timeout: 1500 });
  }

  private checkDiskStorage() {
    this.logger.log('Checking disk storage health...');
    return this.disk.checkStorage('storage', { path: '/', thresholdPercent });
  }

  private checkMemoryUsage() {
    this.logger.log('Checking disk storage health...');
    return this.memory.checkHeap('memory_heap', memoryHeap);
  }
}
