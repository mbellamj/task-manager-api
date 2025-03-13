import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';

import { Public } from '@/common/decorators/public.decorator';
import { ReadinessService } from './readiness.service';

@Controller('health')
export class ReadinessController {
  constructor(private readonly readinessService: ReadinessService) {}

  @Get()
  @Public()
  @HealthCheck()
  check() {
    return this.readinessService.check();
  }
}
