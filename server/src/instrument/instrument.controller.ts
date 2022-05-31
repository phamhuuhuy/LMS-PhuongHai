import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UpdateInstrument } from './dto';
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
  deleteCustomer(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.instrumentService.deleteCustomer(uuid);
  }

  @Patch('/:uuid')
  updateCustomer(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() customer: UpdateInstrument,
  ) {
    return this.instrumentService.updateCustomer(uuid, customer);
  }
}
