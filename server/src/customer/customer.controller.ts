import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

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

    @Delete('/:uuid')
    deleteCustomer(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
        return this.customerService.deleteCustomer(uuid)
    }

}
