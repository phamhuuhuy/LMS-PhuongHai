import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdateLab } from './dto';
import { Lab } from './lab.entity';

@Injectable()
export class LabService {
  constructor(
    @Inject('LAB_REPOSITORY')
    private labRepository: Repository<Lab>,
  ) {}

  async getAll(): Promise<Lab[]> {
    return await this.labRepository.find();
  }

  async createLab(newLab: Lab): Promise<Lab> {
    return this.labRepository.save(newLab);
  }

  async getOne(uuid: string): Promise<Lab> {
    const lab = await this.labRepository.findOneBy({ id: uuid });
    if (!lab) {
      throw new NotFoundException('Lab id is not exist');
    }
    return lab;
  }

  async updateLab(uuid: string, updatedLab: UpdateLab): Promise<Lab> {
    const labFound = await this.getOne(uuid);
    const lab = await this.labRepository.save({
      ...labFound,
      ...updatedLab,
    });
    return lab;
  }

  async deleteLab(uuid: string) {
    const lab = await this.getOne(uuid);
    await this.labRepository.delete(lab);
    return { msg: 'Sucessfully deleted lab' };
  }
}
