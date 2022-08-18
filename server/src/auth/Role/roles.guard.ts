import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { StaffLabService } from 'src/staffLab/staffLab.service';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private staffLabService: StaffLabService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //what is require role
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRoles) {
      return true;
    }
    let userRole;
    const { user } = context.switchToHttp().getRequest();
    if (user.isManager) {
      userRole = Role.ADMIN;
    } else {
      const staff = await this.staffLabService.getRoleByStaffId(user.id);
      userRole = staff.isLead ? Role.LEAD : Role.USER;
    }

    //does the current user making the request have those required roles
    return requireRoles.some((role) => userRole.includes(role));
  }
}
