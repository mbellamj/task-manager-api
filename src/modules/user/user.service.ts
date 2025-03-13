import { Injectable, Logger } from '@nestjs/common';

import { InjectRepositoryPort } from '@/common/decorators/ports.decorator';
import { UserDto } from '@/common/dtos/user.dto';
import { RepositoryPort } from '@/common/interfaces/repository.port';
import { Criteria } from '@/common/interfaces/types';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserQueryFilter } from './dtos/user-query-filter.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepositoryPort(User)
    private readonly repositoryPort: RepositoryPort<User>,
  ) {}

  create(data: CreateUserDto) {
    this.logger.log(`Create user with email: ${data.email}`);
    return this.repositoryPort.create(data);
  }

  findOne(criteria: Criteria<UserDto>) {
    this.logger.log(`Retrieve single user`);
    return this.repositoryPort.findOne(criteria);
  }

  update(id: string, updates: UpdateUserDto) {
    this.logger.log(`Update user ID: ${id}`);
    return this.repositoryPort.update(id, updates);
  }

  remove(criteria: Criteria<UserDto>) {
    this.logger.log(`Remove user`);
    return this.repositoryPort.remove(criteria);
  }

  findAll(query: UserQueryFilter) {
    this.logger.log('Find users list');
    return this.repositoryPort.findAll(query);
  }
}
