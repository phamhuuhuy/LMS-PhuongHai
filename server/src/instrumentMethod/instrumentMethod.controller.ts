import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { InstrumentMethodRequest, InstrumentMethodUpdate } from './dto';
import { InstrumentMethodService } from './instrumentMethod.service';

@Controller('instrument-method')
export class InstrumentMethodController {
  constructor(private readonly methodService: InstrumentMethodService) {}

  @Delete('')
  removeInstrumentMethod(@Body() newInstrumentMethod: InstrumentMethodRequest) {
    return this.methodService.removeInstrumentMethod(newInstrumentMethod);
  }

  @Post('')
  createInstrumentMethod(@Body() newInstrumentMethod: InstrumentMethodRequest) {
    return this.methodService.createInstrumentMethod(newInstrumentMethod);
  }

  @Patch('')
  updateInstrumentMethod(@Body() updated: InstrumentMethodUpdate) {
    return this.methodService.updateInstrumentMethod(updated);
  }
}
