import { InjectRepositoryPort } from '@/common/decorators/ports.decorator';
import { TaskDto } from '@/common/dtos/task.dto';
import { RepositoryPort } from '@/common/interfaces/repository.port';
import { Criteria } from '@/common/interfaces/types';
import { formatCriteria } from '@/common/utils/format.utils';
import { Injectable, Logger } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskQueryFilter } from './dto/task-query-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    @InjectRepositoryPort(Task)
    private readonly repositoryPort: RepositoryPort<Task>,
  ) {}

  create(data: CreateTaskDto) {
    this.logger.log(`Create task ${formatCriteria(data)}`);
    return this.repositoryPort.create(data);
  }

  findOne(criteria: Criteria<TaskDto>) {
    this.logger.log(`Retrieve single task`);
    return this.repositoryPort.findOne(criteria);
  }

  update(id: string, updates: UpdateTaskDto) {
    this.logger.log(`Update task ID: ${id}`);
    return this.repositoryPort.update(id, updates);
  }

  remove(criteria: Criteria<TaskDto>) {
    this.logger.log(`Remove task`);
    return this.repositoryPort.remove(criteria);
  }

  findAll(query: TaskQueryFilter) {
    this.logger.log('Find tasks list');
    return this.repositoryPort.findAll(query);
  }
}
