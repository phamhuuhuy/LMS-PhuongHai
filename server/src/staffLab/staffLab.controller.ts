import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/Role/roles.guard';
import { StaffLabService } from './staffLab.service';

@Controller('staff-lab')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
export class StaffLabController {
  constructor(private readonly staffLabService: StaffLabService) {}
}
