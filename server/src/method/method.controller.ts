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
import { UpdateMethod } from './dto';
import { Method } from './method.entity';
import { MethodService } from './method.service';

@Controller('method')
export class MethodController {
  constructor(private readonly methodService: MethodService) {}

  @Get('')
  async getAll() {
    return this.methodService.getAll();
  }

  @Post('')
  createMethod(@Body() method: Method) {
    return this.methodService.createMethod(method);
  }

  @Get('/:uuid')
  getOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.methodService.getOne(uuid);
  }

  @Delete('/:uuid')
  deleteMethod(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.methodService.deleteMethod(uuid);
  }

  @Patch('/:uuid')
  updateMethod(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() method: UpdateMethod,
  ) {
    return this.methodService.updateMethod(uuid, method);
  }
}
