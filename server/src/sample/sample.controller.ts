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
import { UpdateSample } from './dto';
import { RequestSample } from './dto/request-sample.dto';
import { SampleService } from './sample.service';

@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}
  @Get('')
  getAll() {
    return this.sampleService.getAll();
  }
  @Post('/')
  @Roles(Role.ADMIN)
  createSample(@Body() requestSample: RequestSample) {
    return this.sampleService.create(requestSample);
  }
  @Get('/:uuid')
  getOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.sampleService.getOne(uuid);
  }
  @Delete('/:uuid')
  @Roles(Role.ADMIN)
  deleteSample(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.sampleService.deleteSample(uuid);
  }
  @Patch('/:uuid')
  @Roles(Role.ADMIN)
  updateSample(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() sample: UpdateSample,
  ) {
    return this.sampleService.updateSample(uuid, sample);
  }
}
