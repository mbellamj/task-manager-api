/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { Permission } from '../enums/permission.enum';

@Injectable()
export class PermissionsGuard implements CanActivate {
  private readonly logger = new Logger(PermissionsGuard.name);

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler()],
    );

    if (!requiredPermissions) return true;

    const request = context.switchToHttp().getRequest();

    const user = request.user;

    // Check if the user and permissions exist
    if (!user || !user.permissions) throw new UnauthorizedException();

    const userPermissions = user.permissions as Permission[];

    const hasRequiredPermissions = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );

    if (!hasRequiredPermissions)
      throw new UnauthorizedException(
        `You don't have permission to access this content`,
      );

    return true;
  }
}
