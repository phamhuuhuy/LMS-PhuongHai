import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private customerRepository: Repository<Customer>,
  ) { }

  async getAll(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  async create(newCustomer: Customer): Promise<Customer> {
    return await this.customerRepository.save(newCustomer);
  }

  async getOne(uuid: string): Promise<Customer> {
    return await this.customerRepository.findOne({
      where: {
        id: uuid
      }
    });
  }

  async deleteCustomer(uuid: string): Promise<Object> {
    const customer = await this.customerRepository.findOne({ where: { id: uuid } });
    if (customer === undefined) {
      throw new NotFoundException();
    }
    const response = this.customerRepository.delete(uuid);
    if (response) {
      return {
        "statusCode": 200,
        "message": `Successfully deleted customer with id ${uuid}`,
        "error": "Good Request"
      }
    }
  }
}
