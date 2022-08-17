import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Lab } from 'src/lab/lab.entity';
import { Staff } from 'src/staff/staff.entity';
import { Repository } from 'typeorm';
import { StaffLab } from './staffLab.entity';

@Injectable()
export class StaffLabService {
  constructor(
    @Inject('STAFF_LAB_REPOSITORY')
    private staffLabRepository: Repository<StaffLab>,

    @Inject('STAFF_REPOSITORY')
    private staffRepository: Repository<Staff>,

    @Inject('LAB_REPOSITORY')
    private labRepository: Repository<Lab>,
  ) {}

  async getRoleByStaffId(staffId: string) {
    const staff = await this.staffLabRepository.findOne({
      where: {
        staff_id: staffId,
      },
    });
    return staff;
  }
}
