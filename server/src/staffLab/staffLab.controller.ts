import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/Role/role.enum';
import { RolesGuard } from 'src/auth/Role/roles.guard';
import { Roles } from 'src/decorator/role.decorator';
import { StaffLabRequest, StaffLabUpdate } from './dto';
import { StaffLabService } from './staffLab.service';

@Controller('staff-lab')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
export class StaffLabController {
  constructor(private readonly staffLabService: StaffLabService) {}

  @Delete('')
  @Roles(Role.ADMIN, Role.LEAD)
  removeStaffLab(@Body() newStaffLab: StaffLabUpdate) {
    return this.staffLabService.removeStaffLab(newStaffLab);
  }

  @Post('')
  @Roles(Role.ADMIN, Role.LEAD)
  createStaffLab(@Body() newStaffLab: StaffLabRequest) {
    return this.staffLabService.createStaffLab(newStaffLab);
  }

  @Patch('')
  @Roles(Role.ADMIN, Role.LEAD)
  updateStaffLab(@Body() updated: StaffLabUpdate) {
    return this.staffLabService.updateStaffLab(updated);
  }
}
