import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ChemicalMethod } from 'src/chemicalMethod/chemicalMethod.entity';
import { Between, LessThan, Repository } from 'typeorm';
import { Chemical } from './chemical.entity';
import { UpdateChemical } from './dto';

@Injectable()
export class ChemicalService {
  constructor(
    @Inject('CHEMICAL_REPOSITORY')
    private chemicalRepository: Repository<Chemical>,

    @Inject('CHEMICAL_METHOD_REPOSITORY')
    private chemicalMethodRepository: Repository<ChemicalMethod>,
  ) {}

  async getAll(): Promise<Chemical[]> {
    return await this.chemicalRepository.find();
  }

  async getAllNotInMethod(uuid: String): Promise<Chemical[]> {
    const chemicals = await this.chemicalRepository.find({
      relations: {
        chemicalMethod: true,
      },
    });

    const result = [];
    for (const chemical of chemicals) {
      if (chemical.chemicalMethod.length == 0) {
        result.push(chemical);
        continue;
      }
      const methodId = chemical.chemicalMethod.find((chemicalMethod) => {
        return chemicalMethod.method_id == uuid;
      });
      if (methodId == undefined) {
        result.push(chemical);
      }
    }

    return result;
  }

  async createChemical(newChemical: Chemical): Promise<Chemical> {
    return this.chemicalRepository.save(newChemical);
  }

  async getOne(uuid: string): Promise<Chemical> {
    const chemical = await this.chemicalRepository.findOneBy({ id: uuid });
    if (!chemical) {
      throw new NotFoundException('Chemical id is not exist');
    }
    return chemical;
  }

  async getOverDue(): Promise<Chemical[]> {
    var today = new Date();
    return await this.chemicalRepository.find({
      where: {
        chemicalDueDate: LessThan(today.toISOString()),
      },
    });
  }

  async getNextDue(): Promise<Chemical[]> {
    var today = new Date();
    var nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    return await this.chemicalRepository.find({
      where: {
        chemicalDueDate: Between(today.toISOString(), nextWeek.toISOString()),
      },
    });
  }

  async updateChemical(
    uuid: string,
    updatedChemical: UpdateChemical,
  ): Promise<Chemical> {
    const chemicalFound = await this.getOne(uuid);
    const chemical = await this.chemicalRepository.save({
      ...chemicalFound,
      ...updatedChemical,
    });
    return chemical;
  }

  async deleteChemical(uuid: string) {
    const chemical = await this.getOne(uuid);
    await this.chemicalRepository.delete(chemical.id);
    return { msg: 'Sucessfully deleted chemical' };
  }
}
