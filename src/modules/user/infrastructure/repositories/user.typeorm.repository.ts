import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RepositoryPort } from '@/common/interfaces/repository.port';
import { User } from '@/modules/user/entities/user.entity';
import { TypeOrmService } from '@/services/database/typeorm/typeorm.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserTypeOrmRepository
  extends TypeOrmService<User>
  implements RepositoryPort<User>
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }
}
