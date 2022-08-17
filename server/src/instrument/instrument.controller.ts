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
import { UpdateInstrument } from './dto';
import { Instrument } from './instrument.entity';
import { InstrumentService } from './instrument.service';
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('instrument')
export class InstrumentController {
  constructor(private readonly instrumentService: InstrumentService) {}

  @Get('/not-in-method/:uuid')
  @Roles(Role.ADMIN, Role.LEAD)
  getAllNotInMethod(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.instrumentService.getAllNotInMethod(uuid);
  }

  @Get('')
  getAll() {
    return this.instrumentService.getAll();
  }

  @Post('')
  @Roles(Role.ADMIN)
  createInstrument(@Body() instrument: Instrument) {
    return this.instrumentService.createInstrument(instrument);
  }

  @Get('/over-due')
  getOverDue() {
    return this.instrumentService.getOverDue();
  }

  @Get('/next-due')
  getNextDue() {
    return this.instrumentService.getNextDue();
  }

  @Get('/:uuid')
  getOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.instrumentService.getOne(uuid);
  }

  @Delete('/:uuid')
  @Roles(Role.ADMIN)
  deleteInstrument(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.instrumentService.deleteInstrument(uuid);
  }

  @Patch('/:uuid')
  @Roles(Role.ADMIN)
  updateInstrument(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() instrument: UpdateInstrument,
  ) {
    return this.instrumentService.updateInstrument(uuid, instrument);
  }
}
