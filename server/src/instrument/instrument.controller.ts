import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { Instrument } from './instrument.entity';
import { InstrumentService } from './instrument.service';

@Controller('instrument')
export class InstrumentController {
  constructor(private readonly instrumentService: InstrumentService) {}

  @Get('')
  getAll() {
    return this.instrumentService.getAll();
  }

  @Post('')
  createCustomer(@Body() instrument: Instrument) {
    return this.instrumentService.create(instrument);
  }

  @Get('/overDue')
  getOverDue() {
    return this.instrumentService.getOverDue();
  }

  @Get('/nextDue')
  getNextDue() {
    return this.instrumentService.getNextDue();
  }

  @Get('/:uuid')
  getOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.instrumentService.getOne(uuid);
  }
}
