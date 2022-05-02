import { Inject, Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
    constructor(
        @Inject('CUSTOMER_REPOSITORY')
        private customerRepository: Repository<Customer>,
      ) {}
      
      async getAll(name: string): Promise<Customer[]> {
        if (name){
          return this.customerRepository.find({
            where: {customerName: Like(`%${name}%`)}
          });
        }
        return this.customerRepository.find();
      }

      async create(newCustomer: Customer): Promise<Customer>{
        return this.customerRepository.save(newCustomer);
      }

      async getOne(uuid: string): Promise<Customer> {
        return this.customerRepository.findOneBy({id: uuid});
      }
}