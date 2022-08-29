import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ChemicalMethodRequest, ChemicalMethodUpdate } from './dto';
import { ChemicalMethodService } from './chemicalMethod.service';
import { RolesGuard } from 'src/auth/Role/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/auth/Role/role.enum';
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('chemical-method')
export class ChemicalMethodController {
  constructor(private readonly methodService: ChemicalMethodService) {}

  @Delete('')
  @Roles(Role.ADMIN, Role.LEAD)
  removeChemicalMethod(@Body() newChemicalMethod: ChemicalMethodUpdate) {
    return this.methodService.removeChemicalMethod(newChemicalMethod);
  }

  @Post('')
  @Roles(Role.ADMIN, Role.LEAD)
  createChemicalMethod(@Body() newChemicalMethod: ChemicalMethodRequest) {
    return this.methodService.createChemicalMethod(newChemicalMethod);
  }

  @Patch('')
  @Roles(Role.ADMIN, Role.LEAD)
  updateChemicalMethod(@Body() updated: ChemicalMethodUpdate) {
    return this.methodService.updateChemicalMethod(updated);
  }
}
