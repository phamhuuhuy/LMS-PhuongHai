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
import { InstrumentMethodRequest, InstrumentMethodUpdate } from './dto';
import { InstrumentMethodService } from './instrumentMethod.service';

@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('instrument-method')
export class InstrumentMethodController {
  constructor(private readonly methodService: InstrumentMethodService) {}

  @Delete('')
  @Roles(Role.ADMIN, Role.LEAD)
  removeInstrumentMethod(@Body() newInstrumentMethod: InstrumentMethodUpdate) {
    return this.methodService.removeInstrumentMethod(newInstrumentMethod);
  }

  @Post('')
  @Roles(Role.ADMIN, Role.LEAD)
  createInstrumentMethod(@Body() newInstrumentMethod: InstrumentMethodRequest) {
    return this.methodService.createInstrumentMethod(newInstrumentMethod);
  }

  @Patch('')
  @Roles(Role.ADMIN, Role.LEAD)
  updateInstrumentMethod(@Body() updated: InstrumentMethodUpdate) {
    return this.methodService.updateInstrumentMethod(updated);
  }
}
