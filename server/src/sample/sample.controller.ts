import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/Role/role.enum';
import { RolesGuard } from 'src/auth/Role/roles.guard';
import { Roles } from 'src/decorator/role.decorator';
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
  createCustomer(@Body() requestSample: RequestSample) {
    return this.sampleService.create(requestSample);
  }
  @Get('/:uuid')
  getOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.sampleService.getOne(uuid);
  }
  // @Delete('/:uuid')
  // @Roles(Role.ADMIN)
  // deleteCustomer(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
  //   return this.customerService.deleteCustomer(uuid);
  // }
  // @Patch('/:uuid')
  // @Roles(Role.ADMIN)
  // updateCustomer(
  //   @Param('uuid', new ParseUUIDPipe()) uuid: string,
  //   @Body() customer: UpdateCustomer,
  // ) {
  //   return this.customerService.updateCustomer(uuid, customer);
  // }
}
