import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Between, LessThan, MoreThan, Repository } from 'typeorm';
import { UpdateInstrument } from './dto';
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

  async createInstrument(newInstrument: Instrument): Promise<Instrument> {
    return this.instrumentRepository.save(newInstrument);
  }

  async getOne(uuid: string): Promise<Instrument> {
    const instrument = await this.instrumentRepository.findOneBy({ id: uuid });
    if (!instrument) {
      throw new NotFoundException('Instrument id is not exist');
    }
    return instrument;
  }

  async getOverDue(): Promise<Instrument[]> {
    var today = new Date();
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
  async updateInstrument(
    uuid: string,
    updatedInstrument: UpdateInstrument,
  ): Promise<Instrument> {
    const instrumentFound = await this.getOne(uuid);
    const instrument = await this.instrumentRepository.save({
      ...instrumentFound,
      ...updatedInstrument,
    });
    return instrument;
  }

  async deleteInstrument(uuid: string) {
    const instrument = await this.getOne(uuid);
    await this.instrumentRepository.delete(instrument);
    return { msg: 'Sucessfully deleted instrument' };
  }
}
