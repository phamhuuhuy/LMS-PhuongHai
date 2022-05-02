import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { UpdateCustomer } from './dto';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private customerRepository: Repository<Customer>,
  ) {}

  async getAll(name: string): Promise<Customer[]> {
    if (name) {
      return this.customerRepository.find({
        where: { customerName: Like(`%${name}%`) },
      });
    }
    return this.customerRepository.find();
  }

  async create(newCustomer: Customer): Promise<Customer> {
    return this.customerRepository.save(newCustomer);
  }

  async getOne(uuid: string): Promise<Customer> {
    return this.customerRepository.findOneBy({ id: uuid });
  }

  async updateCustomer(
    uuid: string,
    updatedCustomer: UpdateCustomer,
  ): Promise<Customer> {
    const customerFound = await this.customerRepository.findOne({
      where: {
        id: uuid,
      },
    });
    if (!customerFound) {
      throw new NotFoundException('customer id is not exist');
    }
    const customer = await this.customerRepository.save({
      ...customerFound,
      ...updatedCustomer,
    });
    return customer;
  }
}
