import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/Role/role.enum';
import { RolesGuard } from 'src/auth/Role/roles.guard';
import { GetUser } from 'src/decorator';
import { Roles } from 'src/decorator/role.decorator';
import { UpdateStaff } from './dto';
import { Staff } from './staff.entity';
import { StaffService } from './staff.service';
// @UseGuards(RolesGuard)
// @UseGuards(JwtAuthGuard)
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get('')
  async getAll() {
    return this.staffService.getAll();
  }

  @Get('/not-in-lab/:uuid')
  getAllNotInLab(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.staffService.getAllStaffNotInLab(uuid, false);
  }

  @Get('/not-in-lab/lead/:uuid')
  getAllLeadNotInLab(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.staffService.getAllStaffNotInLab(uuid, true);
  }

  @Post('')
  // @Roles(Role.ADMIN, Role.LEAD)
  createStaff(@Body() staff: Staff) {
    return this.staffService.createStaff(staff);
  }

  @Get('/:uuid')
  getOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.staffService.getOne(uuid);
  }

  @Delete('/:uuid')
  @Roles(Role.ADMIN, Role.LEAD)
  deleteStaff(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.staffService.deleteStaff(uuid);
  }

  @Patch('/:uuid')
  updateStaff(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() staff: UpdateStaff,
  ) {
    return this.staffService.updateStaff(uuid, staff);
  }
}
