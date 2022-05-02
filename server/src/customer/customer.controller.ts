import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';
import { UpdateCustomer } from './dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('/')
  async getAll() {
    return await this.customerService.getAll();
  }

  @Post('/')
  async createCustomer(@Body() customer: Customer) {
    return await this.customerService.create(customer);
  }

  @Get('/:uuid')
  async getOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return await this.customerService.getOne(uuid);
  }

  @Patch('/:uuid')
  updateCustomer(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() customer: UpdateCustomer,
  ) {
    return this.customerService.updateCustomer(uuid, customer);
  }
}
