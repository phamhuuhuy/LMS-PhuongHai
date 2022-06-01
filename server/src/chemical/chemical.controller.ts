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
import { Chemical } from './chemical.entity';
import { ChemicalService } from './chemical.service';
import { UpdateChemical } from './dto';

@Controller('chemical')
export class ChemicalController {
  constructor(private readonly chemicalService: ChemicalService) {}

  @Get('')
  getAll() {
    return this.chemicalService.getAll();
  }

  @Post('')
  createInstrument(@Body() chemical: Chemical) {
    return this.chemicalService.createChemical(chemical);
  }

  @Get('/over-due')
  getOverDue() {
    return this.chemicalService.getOverDue();
  }

  @Get('/:uuid')
  getOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.chemicalService.getOne(uuid);
  }

  @Delete('/:uuid')
  deleteChemical(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.chemicalService.deleteChemical(uuid);
  }

  @Patch('/:uuid')
  updateChemical(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() chemical: UpdateChemical,
  ) {
    return this.chemicalService.updateChemical(uuid, chemical);
  }
}
