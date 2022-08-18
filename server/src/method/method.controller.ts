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
import { InstrumentMethodService } from 'src/instrumentMethod/instrumentMethod.service';
import { UpdateMethod } from './dto';
import { Method } from './method.entity';
import { MethodService } from './method.service';
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('method')
export class MethodController {
  constructor(private readonly methodService: MethodService) {}

  @Get('')
  async getAll() {
    return this.methodService.getAll();
  }

  @Post('')
  @Roles(Role.ADMIN)
  createMethod(@Body() method: Method) {
    return this.methodService.createMethod(method);
  }

  @Get('/:uuid')
  getOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.methodService.getOne(uuid);
  }

  @Delete('/:uuid')
  @Roles(Role.ADMIN)
  deleteMethod(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.methodService.deleteMethod(uuid);
  }

  @Patch('/:uuid')
  @Roles(Role.ADMIN)
  updateMethod(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() method: UpdateMethod,
  ) {
    return this.methodService.updateMethod(uuid, method);
  }
}
