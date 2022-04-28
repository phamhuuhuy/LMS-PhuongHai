import { Body, Controller, Get, Post } from '@nestjs/common';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService){}

    @Get('/')
    getAll() {
        return this.customerService.findAll();
    }

    @Post('/')
    createCustomer(@Body() customer: any){
        return this.customerService.create(customer);
    }
}
