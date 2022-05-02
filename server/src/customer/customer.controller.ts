import {
  Delete,
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';
import { UpdateCustomer } from './dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('')
  getAll(@Query('name') name: string) {
    return this.customerService.getAll(name);
  }

  @Post('/')
  createCustomer(@Body() customer: Customer) {
    return this.customerService.create(customer);
  }

  @Get('/:uuid')
  getOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.customerService.getOne(uuid);
  }

  @Delete('/:uuid')
  deleteCustomer(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.customerService.deleteCustomer(uuid);
  }

  @Patch('/:uuid')
  updateCustomer(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() customer: UpdateCustomer,
  ) {
    return this.customerService.updateCustomer(uuid, customer);
  }
}
