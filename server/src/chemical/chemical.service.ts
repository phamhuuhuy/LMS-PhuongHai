import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { LessThan, Repository } from 'typeorm';
import { Chemical } from './chemical.entity';
import { UpdateChemical } from './dto';

@Injectable()
export class ChemicalService {
  constructor(
    @Inject('CHEMICAL_REPOSITORY')
    private chemicalRepository: Repository<Chemical>,
  ) {}

  async getAll(): Promise<Chemical[]> {
    return await this.chemicalRepository.find();
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

  async updateChemical(
    uuid: string,
    updatedChemical: UpdateChemical,
  ): Promise<Chemical> {
    const instrumentFound = await this.getOne(uuid);
    const instrument = await this.chemicalRepository.save({
      ...instrumentFound,
      ...updatedChemical,
    });
    return instrument;
  }

  async deleteChemical(uuid: string) {
    const chemical = await this.getOne(uuid);
    await this.chemicalRepository.delete(chemical.id);
    return { msg: 'Sucessfully deleted chemical' };
  }
}
