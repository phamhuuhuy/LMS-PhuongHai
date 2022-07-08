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

  @Get('/not-in-method/:uuid')
  getAllNotInMethod(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.instrumentService.getAllNotInMethod(uuid);
  }

  @Get('')
  getAll() {
    return this.instrumentService.getAll();
  }

  @Post('')
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
  deleteInstrument(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.instrumentService.deleteInstrument(uuid);
  }

  @Patch('/:uuid')
  updateInstrument(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() instrument: UpdateInstrument,
  ) {
    return this.instrumentService.updateInstrument(uuid, instrument);
  }
}
