import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmService } from './typeorm.service';

describe('TypeormService', () => {
  let service: TypeOrmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeOrmService],
    }).compile();

    service = module.get<TypeormService>(TypeormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
