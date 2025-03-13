import { Injectable, Logger } from '@nestjs/common';

import { InjectRepositoryPort } from '@/common/decorators/ports.decorator';
import { TasklistDto } from '@/common/dtos/tasklist.dto';
import { RepositoryPort } from '@/common/interfaces/repository.port';
import { Criteria } from '@/common/interfaces/types';
import { formatCriteria } from '@/common/utils/format.utils';
import { CreateTasklistDto } from './dto/create-tasklist.dto';
import { UpdateTasklistDto } from './dto/update-tasklist.dto';
import { Tasklist } from './entities/tasklist.entity';
import { TasklistQueryFilter } from './dto/tasklist-query-filter.dto';

@Injectable()
export class TasklistService {
  private readonly logger = new Logger(TasklistService.name);

  constructor(
    @InjectRepositoryPort(Tasklist)
    private readonly repositoryPort: RepositoryPort<Tasklist>,
  ) {}

  create(data: CreateTasklistDto) {
    this.logger.log(`Create tasklist ${formatCriteria(data)}`);
    return this.repositoryPort.create(data);
  }

  findOne(criteria: Criteria<TasklistDto>) {
    this.logger.log(`Retrieve single tasklist`);
    return this.repositoryPort.findOne(criteria);
  }

  update(id: string, updates: UpdateTasklistDto) {
    this.logger.log(`Update tasklist ID: ${id}`);
    return this.repositoryPort.update(id, updates);
  }

  remove(criteria: Criteria<TasklistDto>) {
    this.logger.log(`Remove tasklist`);
    return this.repositoryPort.remove(criteria);
  }

  findAll(query: TasklistQueryFilter) {
    this.logger.log('Find tasklists');
    return this.repositoryPort.findAll(query);
  }
}
