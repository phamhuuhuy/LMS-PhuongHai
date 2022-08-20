import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Chemical } from 'src/chemical/chemical.entity';
import { ChemicalMethod } from 'src/chemicalMethod/chemicalMethod.entity';
import { Instrument } from 'src/instrument/instrument.entity';
import { InstrumentMethod } from 'src/instrumentMethod/instrumentMethod.entity';
import { Repository } from 'typeorm';
import { MethodResponse, UpdateMethod } from './dto';
import { Method } from './method.entity';

@Injectable()
export class MethodService {
  constructor(
    @Inject('METHOD_REPOSITORY')
    private methodRepository: Repository<Method>,

    @Inject('INSTRUMENT_METHOD_REPOSITORY')
    private instrumentMethodRepository: Repository<InstrumentMethod>,

    @Inject('CHEMICAL_METHOD_REPOSITORY')
    private chemicalMethodRepository: Repository<ChemicalMethod>,
  ) {}

  async getAll(): Promise<Method[]> {
    return await this.methodRepository.find();
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
        chemicalMethod: true,
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
    const chemicalMethod = await this.chemicalMethodRepository.find({
      where: {
        method: method,
      },
      relations: {
        chemical: true,
      },
    });
    const instruments: Instrument[] = instrumentMethod.map(
      (value: InstrumentMethod) => value.instrument,
    );

    const chemicals: Chemical[] = chemicalMethod.map(
      (value: ChemicalMethod) => value.chemical,
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
      chemicals,
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
    await this.methodRepository.delete(method.id);
    return { msg: 'Sucessfully deleted method' };
  }
}
