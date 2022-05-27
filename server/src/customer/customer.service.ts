import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Like, Repository, DeleteResult } from 'typeorm';
import { Customer } from './customer.entity';
import { UpdateCustomer } from './dto';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private customerRepository: Repository<Customer>,
  ) {}

  async getAll(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  async create(newCustomer: Customer): Promise<Customer> {
    return this.customerRepository.save(newCustomer);
  }

  async getOne(uuid: string): Promise<Customer> {
    const customer = await this.customerRepository.findOneBy({ id: uuid });
    if (!customer) {
      throw new NotFoundException('Customer id is not exist');
    }
    return customer;
  }

  async updateCustomer(
    uuid: string,
    updatedCustomer: UpdateCustomer,
  ): Promise<Customer> {
    const customerFound = await this.getOne(uuid);
    const customer = await this.customerRepository.save({
      ...customerFound,
      ...updatedCustomer,
    });
    return customer;
  }

  async deleteCustomer(uuid: string) {
    const customer = await this.getOne(uuid);
    await this.customerRepository.delete(customer.id);
    return { msg: 'Sucessfully deleted customer' };
  }
}
