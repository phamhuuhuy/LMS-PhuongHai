import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Instrument } from 'src/instrument/instrument.entity';
import { InstrumentService } from 'src/instrument/instrument.service';
import { Method } from 'src/method/method.entity';
import { MethodService } from 'src/method/method.service';
import { Repository } from 'typeorm';
import { InstrumentMethodRequest, InstrumentMethodUpdate } from './dto';
import { InstrumentMethod } from './instrumentMethod.entity';

@Injectable()
export class InstrumentMethodService {
  constructor(
    @Inject('INSTRUMENT_METHOD_REPOSITORY')
    private instrumentMethodRepository: Repository<InstrumentMethod>,

    @Inject('INSTRUMENT_REPOSITORY')
    private instrumentRepository: Repository<Instrument>,

    @Inject('METHOD_REPOSITORY')
    private methodRepository: Repository<Method>,
  ) {}

  async mappingRequestToDTO(newInstrumentMethod: InstrumentMethodRequest) {
    const instrument = await this.instrumentRepository.findOne({
      where: {
        id: newInstrumentMethod.instrumentId,
      },
      relations: {
        instrumentMethod: true,
      },
    });
    if (!instrument) {
      throw new NotFoundException('Instrument id is not exist');
    }
    const method = await this.methodRepository.findOne({
      where: {
        id: newInstrumentMethod.methodId,
      },
      relations: {
        instrumentMethod: true,
      },
    });
    if (!method) {
      throw new NotFoundException('Method id is not exist');
    }
    return {
      method,
      instrument,
      quantity: newInstrumentMethod.quantity,
      note: newInstrumentMethod.note,
    };
  }

  async createInstrumentMethod(newInstrumentMethod: InstrumentMethodRequest) {
    try {
      const mapped = await this.mappingRequestToDTO(newInstrumentMethod);
      const added = await this.instrumentMethodRepository.save(mapped);
      return { msg: 'Sucessfully add instrument to method' };
    } catch (error) {
      return error.response;
    }
  }

  async removeInstrumentMethod(newInstrumentMethod: InstrumentMethodUpdate) {
    const mapped = await this.mappingRequestToDTO(newInstrumentMethod);
    const instrumentMethod = await this.instrumentMethodRepository.findOne({
      where: {
        method: mapped.method,
        instrument: mapped.instrument,
      },
    });
    await this.instrumentMethodRepository.delete(instrumentMethod);
    return { msg: 'Sucessfully deleted instrument in method' };
  }

  async updateInstrumentMethod(
    updatedInstrumentMethod: InstrumentMethodUpdate,
  ) {
    const mapped = await this.mappingRequestToDTO(updatedInstrumentMethod);
    const instrumentMethodFound = await this.instrumentMethodRepository.findOne(
      {
        where: {
          method: mapped.method,
          instrument: mapped.instrument,
        },
      },
    );
    await this.instrumentMethodRepository.save({
      ...instrumentMethodFound,
      ...mapped,
    });
    return { msg: 'Sucessfully update instrument in method' };
  }

  async getOne(uuid: string) {
    const method = (await this.methodRepository.findOne({
      where: {
        id: uuid,
      },
      relations: {
        instrumentMethod: true,
      },
    })) as Method;
    const instrumentMethod = await this.instrumentMethodRepository.find({
      where: {
        method: method,
      },
      relations: {
        instrument: true,
      },
    });
    const instruments: Instrument[] = instrumentMethod.map(
      (value) => value.instrument,
    );
    return { method, instruments };
  }
}
