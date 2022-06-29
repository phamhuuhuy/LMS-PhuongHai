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
import { UpdateLab } from './dto';
import { Lab } from './lab.entity';
import { LabService } from './lab.service';

@Controller('lab')
export class LabController {
  constructor(private readonly labService: LabService) {}

  @Get('')
  getAll() {
    return this.labService.getAll();
  }

  @Post('')
  createLab(@Body() lab: Lab) {
    return this.labService.createLab(lab);
  }

  @Get('/:uuid')
  getOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.labService.getOne(uuid);
  }

  @Delete('/:uuid')
  deleteLab(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.labService.deleteLab(uuid);
  }

  @Patch('/:uuid')
  updateLab(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() lab: UpdateLab,
  ) {
    return this.labService.updateLab(uuid, lab);
  }
}
