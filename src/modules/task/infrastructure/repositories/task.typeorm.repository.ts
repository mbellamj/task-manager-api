import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RepositoryPort } from '@/common/interfaces/repository.port';
import { Task } from '@/modules/task/entities/task.entity';
import { TypeOrmService } from '@/services/database/typeorm/typeorm.service';

@Injectable()
export class TaskTypeOrmRepository
  extends TypeOrmService<Task>
  implements RepositoryPort<Task>
{
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {
    super(taskRepository);
  }
}
