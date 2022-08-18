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
import { Chemical } from './chemical.entity';
import { ChemicalService } from './chemical.service';
import { UpdateChemical } from './dto';
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('chemical')
export class ChemicalController {
  constructor(private readonly chemicalService: ChemicalService) {}

  @Get('')
  getAll() {
    return this.chemicalService.getAll();
  }

  @Get('/not-in-method/:uuid')
  @Roles(Role.ADMIN, Role.LEAD)
  getAllNotInMethod(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.chemicalService.getAllNotInMethod(uuid);
  }

  @Post('')
  @Roles(Role.ADMIN)
  createInstrument(@Body() chemical: Chemical) {
    return this.chemicalService.createChemical(chemical);
  }

  @Get('/over-due')
  getOverDue() {
    return this.chemicalService.getOverDue();
  }

  @Get('/next-due')
  getNextDue() {
    return this.chemicalService.getNextDue();
  }

  @Get('/:uuid')
  getOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.chemicalService.getOne(uuid);
  }

  @Delete('/:uuid')
  @Roles(Role.ADMIN)
  deleteChemical(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.chemicalService.deleteChemical(uuid);
  }

  @Patch('/:uuid')
  @Roles(Role.ADMIN)
  updateChemical(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() chemical: UpdateChemical,
  ) {
    return this.chemicalService.updateChemical(uuid, chemical);
  }
}
