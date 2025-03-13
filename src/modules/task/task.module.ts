import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getRepositoryPort } from '@/common/utils/ports.utils';
import { Task } from './entities/task.entity';
import { TaskTypeOrmRepository } from './infrastructure/repositories/task.typeorm.repository';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],

  controllers: [TaskController],
  providers: [
    TaskService,
    {
      provide: getRepositoryPort(Task),
      useClass: TaskTypeOrmRepository,
    },
  ],
  exports: [TaskService],
})
export class TaskModule {}
