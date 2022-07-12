import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { ChemicalMethodRequest, ChemicalMethodUpdate } from './dto';
import { ChemicalMethodService } from './chemicalMethod.service';

@Controller('chemical-method')
export class ChemicalMethodController {
  constructor(private readonly methodService: ChemicalMethodService) {}

  @Delete('')
  removeChemicalMethod(@Body() newChemicalMethod: ChemicalMethodUpdate) {
    return this.methodService.removeChemicalMethod(newChemicalMethod);
  }

  @Post('')
  createChemicalMethod(@Body() newChemicalMethod: ChemicalMethodRequest) {
    return this.methodService.createChemicalMethod(newChemicalMethod);
  }

  @Patch('')
  updateChemicalMethod(@Body() updated: ChemicalMethodUpdate) {
    return this.methodService.updateChemicalMethod(updated);
  }
}
