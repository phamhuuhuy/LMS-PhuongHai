import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Between, LessThan, MoreThan, Repository } from 'typeorm';
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

  async getOverDue(): Promise<Instrument[]> {
    var today = new Date();
    console.log(today);
    return await this.instrumentRepository.find({
      where: {
        instrumentNextCalibrationDate: LessThan(today.toISOString()),
      },
    });
  }

  async getNextDue(): Promise<Instrument[]> {
    var today = new Date();
    var nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    return await this.instrumentRepository.find({
      where: {
        instrumentNextCalibrationDate: Between(
          today.toISOString(),
          nextWeek.toISOString(),
        ),
      },
    });
  }
}
