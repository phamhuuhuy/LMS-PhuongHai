import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Customer } from 'src/customer/customer.entity';
import { CustomerService } from 'src/customer/customer.service';
import { LabResponse } from 'src/lab/dto';
import { Lab } from 'src/lab/lab.entity';
import { LabService } from 'src/lab/lab.service';
import { Like, Repository, DeleteResult } from 'typeorm';
import { RequestSample } from './dto/request-sample.dto';
import { Status } from './dto/status.enum';
import { Sample } from './sample.entity';

@Injectable()
export class SampleService {
  constructor(
    @Inject('SAMPLE_REPOSITORY')
    private sampleRepository: Repository<Sample>,

    @Inject('LAB_REPOSITORY')
    private labRepository: Repository<Lab>,

    @Inject('CUSTOMER_REPOSITORY')
    private customerRepository: Repository<Customer>,
  ) {}

  async getAll(): Promise<Sample[]> {
    return await this.sampleRepository.find();
  }

  async create(sampleRequest: RequestSample): Promise<Sample> {
    const lab = await this.labRepository.findOne({
      where: {
        id: sampleRequest.labId,
      },
    });
    if (!lab) {
      throw new NotFoundException('Lab id is not exist');
    }
    const customer = await this.customerRepository.findOneBy({
      id: sampleRequest.customerId,
    });
    if (!customer) {
      throw new NotFoundException('Customer id is not exist');
    }
    const sampleReceivedDate = new Date();
    const newSample: Sample = {
      sampleReceivedDate: sampleReceivedDate.toISOString().slice(0, 10),
      sampleReturnedResultDate: null,
      sampleNote: sampleRequest.sampleNote,
      sampleStatus: Status.NOT_ASSIGNED,
      customer: customer,
      lab: lab,
    };

    return this.sampleRepository.save(newSample);
  }

  async getOne(uuid: string): Promise<Sample> {
    const sample = await this.sampleRepository.findOne({
      where: { id: uuid },
      relations: {
        customer: true,
        lab: true,
      },
    });
    if (!sample) {
      throw new NotFoundException('Sample id is not exist');
    }
    return sample;
  }

  // async updateCustomer(
  //   uuid: string,
  //   updatedCustomer: UpdateCustomer,
  // ): Promise<Customer> {
  //   const customerFound = await this.getOne(uuid);
  //   const customer = await this.customerRepository.save({
  //     ...customerFound,
  //     ...updatedCustomer,
  //   });
  //   return customer;
  // }

  // async deleteCustomer(uuid: string) {
  //   const customer = await this.getOne(uuid);
  //   await this.customerRepository.delete(customer.id);
  //   return { msg: 'Sucessfully deleted customer' };
  // }
}
