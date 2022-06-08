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
import { UpdateStaff } from './dto';
import { Staff } from './staff.entity';
import { StaffService } from './staff.service';
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get('')
  async getAll() {
    return this.staffService.getAll();
  }

  @Post('')
  createInstrument(@Body() staff: Staff) {
    return this.staffService.createStaff(staff);
  }

  @Get('/:uuid')
  getOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.staffService.getOne(uuid);
  }

  @Delete('/:uuid')
  deleteInstrument(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.staffService.deleteStaff(uuid);
  }

  @Patch('/:uuid')
  updateInstrument(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() staff: UpdateStaff,
  ) {
    return this.staffService.updateStaff(uuid, staff);
  }
}
