import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Customer } from 'src/customer/customer.entity';
import { CustomerService } from 'src/customer/customer.service';
import { UpdateCustomer } from 'src/customer/dto';
import { LabResponse } from 'src/lab/dto';
import { Lab } from 'src/lab/lab.entity';
import { LabService } from 'src/lab/lab.service';
import { Like, Repository, DeleteResult, LessThan } from 'typeorm';
import { UpdateSample } from './dto';
import { GetOneSampleResponse } from './dto/getOne-respone.dto';
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

    private labService: LabService,
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
      sampleName: sampleRequest.sampleName,
      sampleReceivedDate: sampleReceivedDate.toISOString().slice(0, 10),
      sampleReturnedResultDate: null,
      sampleNote: sampleRequest.sampleNote,
      sampleStatus: Status.PROCCESSING,
      customer: customer,
      lab: lab,
    };

    return this.sampleRepository.save(newSample);
  }

  async getOne(uuid: string): Promise<GetOneSampleResponse> {
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
    const lab1 = await this.labService.getOne(sample.lab.id);
    return { ...sample, id: sample.id, lead: lab1.lead };
  }

  async updateSample(
    uuid: string,
    updatedSample: UpdateSample,
  ): Promise<Sample> {
    let lab: Lab;
    let customer: Customer;

    if (updatedSample.labId) {
      lab = await this.labRepository.findOne({
        where: {
          id: updatedSample.labId,
        },
      });
      if (!lab) {
        throw new NotFoundException('Lab id is not exist');
      }
    }

    if (updatedSample.customerId) {
      customer = await this.customerRepository.findOne({
        where: {
          id: updatedSample.customerId,
        },
      });
      if (!customer) {
        throw new NotFoundException('Customer id is not exist');
      }
    }
    const sampleFound = await this.getOne(uuid);
    let sampleReturnedResultDate;
    if (updatedSample.sampleStatus == Status.DONE) {
      sampleReturnedResultDate = new Date().toISOString().slice(0, 10);
    } else if (!updatedSample.sampleStatus) {
      sampleReturnedResultDate = sampleFound.sampleReturnedResultDate;
    } else {
      sampleReturnedResultDate = null;
    }

    const sample = {
      id: uuid,
      sampleName: updatedSample.sampleName || sampleFound.sampleName,
      sampleReceivedDate:
        updatedSample.sampleReceivedDate || sampleFound.sampleReceivedDate,
      sampleReturnedResultDate: sampleReturnedResultDate,
      sampleNote: updatedSample.sampleNote || sampleFound.sampleNote,
      sampleStatus: updatedSample.sampleStatus || sampleFound.sampleStatus,
      lab: lab,
      customer: customer,
    };

    const addedSample = await this.sampleRepository.save(sample);
    return addedSample;
  }

  async deleteSample(uuid: string) {
    const sample = await this.getOne(uuid);
    await this.sampleRepository.delete(sample.id);
    return { msg: 'Sucessfully deleted sample' };
  }
}
