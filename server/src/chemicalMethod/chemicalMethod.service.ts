import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Chemical } from 'src/chemical/chemical.entity';
import { Method } from 'src/method/method.entity';
import { Repository } from 'typeorm';
import { ChemicalMethodRequest, ChemicalMethodUpdate } from './dto';
import { ChemicalMethod } from './chemicalMethod.entity';

@Injectable()
export class ChemicalMethodService {
  constructor(
    @Inject('CHEMICAL_METHOD_REPOSITORY')
    private chemicalMethodRepository: Repository<ChemicalMethod>,

    @Inject('CHEMICAL_REPOSITORY')
    private chemicalRepository: Repository<Chemical>,

    @Inject('METHOD_REPOSITORY')
    private methodRepository: Repository<Method>,
  ) {}

  async mappingRequestToDTO(newChemicalMethod: ChemicalMethodRequest) {
    const chemical = await this.chemicalRepository.findOne({
      where: {
        id: newChemicalMethod.chemicalId,
      },
      relations: {
        chemicalMethod: true,
      },
    });
    if (!chemical) {
      throw new NotFoundException('Chemical id is not exist');
    }
    const method = await this.methodRepository.findOne({
      where: {
        id: newChemicalMethod.methodId,
      },
      relations: {
        chemicalMethod: true,
      },
    });
    if (!method) {
      throw new NotFoundException('Method id is not exist');
    }
    return {
      method,
      chemical,
      quantity: newChemicalMethod.quantity,
      note: newChemicalMethod.note,
    };
  }

  async createChemicalMethod(newChemicalMethod: ChemicalMethodRequest) {
    try {
      const mapped = await this.mappingRequestToDTO(newChemicalMethod);
      const added = await this.chemicalMethodRepository.save(mapped);
      return { msg: 'Sucessfully add chemical to method' };
    } catch (error) {
      return error.response;
    }
  }

  async removeChemicalMethod(newChemicalMethod: ChemicalMethodUpdate) {
    const mapped = await this.mappingRequestToDTO(newChemicalMethod);

    const chemicalMethod = await this.chemicalMethodRepository.findOne({
      where: {
        chemical_id: mapped.chemical.id,
        method: mapped.method,
      },
    });
    await this.chemicalMethodRepository.delete(chemicalMethod);
    return { msg: 'Sucessfully deleted chemical in method' };
  }

  async updateChemicalMethod(updatedChemicalMethod: ChemicalMethodUpdate) {
    const mapped = await this.mappingRequestToDTO(updatedChemicalMethod);
    const chemicalMethodFound = await this.chemicalMethodRepository.findOne({
      where: {
        method: mapped.method,
        chemical: mapped.chemical,
      },
    });
    await this.chemicalMethodRepository.save({
      ...chemicalMethodFound,
      ...mapped,
    });
    return { msg: 'Sucessfully update chemical in method' };
  }

  async getOne(uuid: string) {
    const method = (await this.methodRepository.findOne({
      where: {
        id: uuid,
      },
      relations: {
        chemicalMethod: true,
      },
    })) as Method;
    const chemicalMethod = await this.chemicalMethodRepository.find({
      where: {
        method: method,
      },
      relations: {
        chemical: true,
      },
    });
    const chemicals: Chemical[] = chemicalMethod.map((value) => value.chemical);
    return { method, chemicals };
  }
}
