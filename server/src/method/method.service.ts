import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Instrument } from 'src/instrument/instrument.entity';
import { InstrumentMethod } from 'src/instrumentMethod/instrumentMethod.entity';
import EncryptValue from 'src/utils/encrypt.util';
import { createQueryBuilder, Repository } from 'typeorm';
import { MethodResponse, UpdateMethod } from './dto';
import { Method } from './method.entity';

@Injectable()
export class MethodService {
  constructor(
    @Inject('METHOD_REPOSITORY')
    private methodRepository: Repository<Method>,

    @Inject('INSTRUMENT_METHOD_REPOSITORY')
    private instrumentMethodRepository: Repository<InstrumentMethod>,
  ) {}

  async getAll(): Promise<Method[]> {
    return await this.methodRepository.find({
      relations: {
        instrumentMethod: true,
      },
    });
  }

  async createMethod(newMethod: Method): Promise<Method> {
    return this.methodRepository.save(newMethod);
  }

  async getOne(uuid: string): Promise<MethodResponse> {
    const method = await this.methodRepository.findOne({
      where: {
        id: uuid,
      },
      relations: {
        instrumentMethod: true,
      },
    });
    if (!method) {
      throw new NotFoundException('Method id is not exist');
    }
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
    return {
      id: method.id,
      methodTargets: method.methodTargets,
      methodName: method.methodName,
      methodDetail: method.methodDetail,
      methodScope: method.methodScope,
      methodTime: method.methodTime,
      methodFileUrl: method.methodFileUrl,
      instruments,
    };
  }

  async updateMethod(
    uuid: string,
    updatedMethod: UpdateMethod,
  ): Promise<Method> {
    const methodFound = await this.getOne(uuid);
    const method = await this.methodRepository.save({
      ...methodFound,
      ...updatedMethod,
    });
    return method;
  }

  async deleteMethod(uuid: string) {
    const method = await this.getOne(uuid);
    await this.methodRepository.delete(method);
    return { msg: 'Sucessfully deleted method' };
  }
}
