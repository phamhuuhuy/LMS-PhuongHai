import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InstrumentMethod } from 'src/instrumentMethod/instrumentMethod.entity';
import { Between, LessThan, MoreThan, Repository } from 'typeorm';
import { UpdateInstrument } from './dto';
import { Instrument } from './instrument.entity';

@Injectable()
export class InstrumentService {
  constructor(
    @Inject('INSTRUMENT_REPOSITORY')
    private instrumentRepository: Repository<Instrument>,

    @Inject('INSTRUMENT_METHOD_REPOSITORY')
    private instrumentMethodRepository: Repository<InstrumentMethod>,
  ) {}

  async getAll(): Promise<Instrument[]> {
    return await this.instrumentRepository.find({
      relations: {
        instrumentMethod: true,
      },
    });
  }

  async getAllNotInMethod(uuid: String): Promise<Instrument[]> {
    const instruments = await this.instrumentRepository.find({
      relations: {
        instrumentMethod: true,
      },
    });
    const result = [];
    for (const instrument of instruments) {
      if (instrument.instrumentMethod.length == 0) {
        break;
      }
      const methodId = instrument.instrumentMethod.find((instrumentMethod) => {
        return instrumentMethod.method_id == uuid;
      });
      if (methodId == undefined) {
        result.push(instrument);
        continue;
      }

      const instrumentMethod = await this.instrumentMethodRepository.findOne({
        where: {
          method_id: methodId.method_id,
        },
      });
      if (instrument.id == instrumentMethod.instrument_id) {
        console.log('hehe');
        break;
      }
      result.push(instrument);
    }

    return result;
  }

  async createInstrument(newInstrument: Instrument): Promise<Instrument> {
    return this.instrumentRepository.save(newInstrument);
  }

  async getOne(uuid: string): Promise<Instrument> {
    const instrument = await this.instrumentRepository.findOne({
      where: {
        id: uuid,
      },
      relations: {
        instrumentMethod: true,
      },
    });
    if (!instrument) {
      throw new NotFoundException('Instrument id is not exist');
    }
    return instrument;
  }

  async getOverDue(): Promise<Instrument[]> {
    var today = new Date();
    return await this.instrumentRepository.find({
      where: {
        instrumentCalibrationDate: LessThan(today.toISOString()),
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
