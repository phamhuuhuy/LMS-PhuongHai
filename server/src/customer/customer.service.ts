import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
    constructor(
        @Inject('CUSTOMER_REPOSITORY')
        private customerRepository: Repository<Customer>,
      ) {}
      
      async findAll(): Promise<Customer[]> {
        return this.customerRepository.find();
      }

      async create(newCustomer: Customer): Promise<Customer>{
        return this.customerRepository.save(newCustomer);
      }
}
