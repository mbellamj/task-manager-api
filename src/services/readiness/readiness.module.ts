import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { gracefulShutdownTimeoutMs } from '@/common/constants/readiness.constants';
import { ReadinessController } from './readiness.controller';
import { ReadinessService } from './readiness.service';

@Module({
  imports: [TerminusModule.forRoot({ gracefulShutdownTimeoutMs })],
  controllers: [ReadinessController],
  providers: [ReadinessService],
})
export class ReadinessModule {}
