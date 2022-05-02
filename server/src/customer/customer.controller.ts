import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService){}

    @Get('')
    getAll(@Query('name') name: string) {
        return this.customerService.getAll(name);
    }

    @Post('/')
    createCustomer(@Body() customer: Customer){
        return this.customerService.create(customer);
    }

    @Get('/:uuid')
    getOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
        return this.customerService.getOne(uuid);
    }

}
