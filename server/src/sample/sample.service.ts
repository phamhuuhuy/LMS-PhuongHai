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
import { Like, Repository, DeleteResult } from 'typeorm';
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
      sampleReceivedDate: sampleReceivedDate.toISOString().slice(0, 10),
      sampleReturnedResultDate: null,
      sampleNote: sampleRequest.sampleNote,
      sampleStatus: Status.NOT_ASSIGNED,
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
  ): Promise<UpdateSample> {
    const sampleFound = await this.getOne(uuid);

    if (updatedSample.sampleReturnedResultDate) {
      updatedSample.sampleStatus = Status.DONE;
    }

    const sample = {
      id: uuid,
      sampleReceivedDate:
        updatedSample.sampleReceivedDate || sampleFound.sampleReceivedDate,
      sampleReturnedResultDate:
        updatedSample.sampleReturnedResultDate ||
        sampleFound.sampleReturnedResultDate,
      sampleNote: updatedSample.sampleNote || sampleFound.sampleNote,
      sampleStatus: updatedSample.sampleStatus || sampleFound.sampleStatus,
      labId: updatedSample.labId || sampleFound.lab.id,
      customerId: updatedSample.customerId || sampleFound.customer.id,
    };

    if (sample.sampleStatus == Status.DONE) {
      if (!sample.sampleReturnedResultDate) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error:
              'Please update the return result date if your sample status is done',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      sample.sampleReturnedResultDate = null;
    }

    const addedSample = await this.sampleRepository.save(sample);
    return addedSample;
  }

  async deleteSample(uuid: string) {
    const sample = await this.getOne(uuid);
    await this.sampleRepository.delete(sample.id);
    return { msg: 'Sucessfully deleted sample' };
  }
}
