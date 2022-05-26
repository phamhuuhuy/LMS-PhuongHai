import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Instrument } from './instrument.entity';

@Injectable()
export class InstrumentService {
  constructor(
    @Inject('INSTRUMENT_REPOSITORY')
    private instrumentRepository: Repository<Instrument>,
  ) {}

  async getAll(): Promise<Instrument[]> {
    return await this.instrumentRepository.find();
  }

  async create(newInstrument: Instrument): Promise<Instrument> {
    return this.instrumentRepository.save(newInstrument);
  }

  async getOne(uuid: string): Promise<Instrument> {
    const customer = await this.instrumentRepository.findOneBy({ id: uuid });
    if (!customer) {
      throw new NotFoundException('Customer id is not exist');
    }
    return customer;
  }
}
