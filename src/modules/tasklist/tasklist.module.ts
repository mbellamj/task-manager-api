import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getRepositoryPort } from '@/common/utils/ports.utils';
import { Tasklist } from './entities/tasklist.entity';
import { TasklistTypeOrmRepository } from './infrastructure/repositories/tasklist.typeorm.repository';
import { TasklistController } from './tasklist.controller';
import { TasklistService } from './tasklist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tasklist])],
  controllers: [TasklistController],
  providers: [
    TasklistService,
    {
      provide: getRepositoryPort(Tasklist),
      useClass: TasklistTypeOrmRepository,
    },
  ],
  exports: [TasklistService],
})
export class TasklistModule {}
