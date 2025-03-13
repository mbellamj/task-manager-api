import { PermissionsGuard } from '@/common/guards/permissions.guard';

describe('PermissionsGuard', () => {
  it('should be defined', () => {
    expect(new PermissionsGuard()).toBeDefined();
  });
});
