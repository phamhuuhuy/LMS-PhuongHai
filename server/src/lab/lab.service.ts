import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Staff } from 'src/staff/staff.entity';
import { StaffLab } from 'src/staffLab/staffLab.entity';
import { Repository } from 'typeorm';
import { LabResponse, UpdateLab } from './dto';
import { Lab } from './lab.entity';

@Injectable()
export class LabService {
  constructor(
    @Inject('STAFF_REPOSITORY')
    private staffRepository: Repository<Staff>,

    @Inject('LAB_REPOSITORY')
    private labRepository: Repository<Lab>,

    @Inject('STAFF_LAB_REPOSITORY')
    private staffLabRepository: Repository<StaffLab>,
  ) {}

  async getAll(): Promise<Lab[]> {
    return await this.labRepository.find();
  }

  async createLab(newLab: Lab): Promise<Lab> {
    return this.labRepository.save(newLab);
  }

  async getOne(uuid: string): Promise<LabResponse> {
    const lab = await this.labRepository.findOne({
      where: {
        id: uuid,
      },
      relations: {
        staffLab: true,
        samples: true,
      },
    });
    if (!lab) {
      throw new NotFoundException('Lab id is not exist');
    }
    const staffLab = await this.staffLabRepository.find({
      where: {
        lab: lab,
      },
      relations: {
        staff: true,
      },
    });
    const lead: Staff = staffLab.find((staffLab) => staffLab.isLead).staff;
    const staffs: Staff[] = staffLab.map((value: StaffLab) => value.staff);
    return {
      id: lab.id,
      labName: lab.labName,
      subLab: lab.subLab,
      certification: lab.certification,
      lead: lead,
      samples: lab.samples,
      staffs,
    };
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
    await this.labRepository.delete(lab.id);
    return { msg: 'Sucessfully deleted lab' };
  }
}
