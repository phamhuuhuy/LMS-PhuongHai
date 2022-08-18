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
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/Role/role.enum';
import { RolesGuard } from 'src/auth/Role/roles.guard';
import { Roles } from 'src/decorator/role.decorator';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';
import { UpdateCustomer } from './dto';
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('')
  getAll() {
    return this.customerService.getAll();
  }

  @Post('/')
  @Roles(Role.ADMIN)
  createCustomer(@Body() customer: Customer) {
    return this.customerService.create(customer);
  }

  @Get('/:uuid')
  getOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.customerService.getOne(uuid);
  }

  @Delete('/:uuid')
  @Roles(Role.ADMIN)
  deleteCustomer(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.customerService.deleteCustomer(uuid);
  }

  @Patch('/:uuid')
  @Roles(Role.ADMIN)
  updateCustomer(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() customer: UpdateCustomer,
  ) {
    return this.customerService.updateCustomer(uuid, customer);
  }
}
