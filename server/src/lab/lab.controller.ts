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
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/Role/role.enum';
import { RolesGuard } from 'src/auth/Role/roles.guard';
import { Roles } from 'src/decorator/role.decorator';
import { UpdateLab } from './dto';
import { Lab } from './lab.entity';
import { LabService } from './lab.service';
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('lab')
export class LabController {
  constructor(private readonly labService: LabService) {}

  @Get('')
  getAll() {
    return this.labService.getAll();
  }

  @Post('')
  @Roles(Role.ADMIN)
  createLab(@Body() lab: Lab) {
    return this.labService.createLab(lab);
  }

  @Get('/:uuid')
  getOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.labService.getOne(uuid);
  }

  @Delete('/:uuid')
  @Roles(Role.ADMIN)
  deleteLab(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.labService.deleteLab(uuid);
  }

  @Patch('/:uuid')
  @Roles(Role.ADMIN, Role.LEAD)
  updateLab(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() lab: UpdateLab,
  ) {
    return this.labService.updateLab(uuid, lab);
  }
}
