import { RoleGuard } from '@/common/guards/role.guard';

describe('RoleGuard', () => {
  it('should be defined', () => {
    expect(new RoleGuard()).toBeDefined();
  });
});
