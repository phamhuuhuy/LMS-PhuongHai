import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
    constructor(
        @Inject('CUSTOMER_REPOSITORY')
        private customerRepository: Repository<Customer>,
      ) {}
      
      async getAll(): Promise<Customer[]> {
        return await this.customerRepository.find();
      }

      async create(newCustomer: Customer): Promise<Customer>{
        return await this.customerRepository.save(newCustomer);
      }

      async getOne(uuid: string): Promise<Customer> {
        return await this.customerRepository.findOne({
          where: {
            id: uuid
          }
        });
      }
}
