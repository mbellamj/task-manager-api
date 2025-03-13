import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RepositoryPort } from '@/common/interfaces/repository.port';
import { Tasklist } from '@/modules/tasklist/entities/tasklist.entity';
import { TypeOrmService } from '@/services/database/typeorm/typeorm.service';

@Injectable()
export class TasklistTypeOrmRepository
  extends TypeOrmService<Tasklist>
  implements RepositoryPort<Tasklist>
{
  constructor(
    @InjectRepository(Tasklist)
    private readonly tasklistRepository: Repository<Tasklist>,
  ) {
    super(tasklistRepository);
  }
}
