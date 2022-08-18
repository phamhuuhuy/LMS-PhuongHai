import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Lab } from 'src/lab/lab.entity';
import { Staff } from 'src/staff/staff.entity';
import { Repository } from 'typeorm';
import { StaffLabRequest, StaffLabUpdate } from './dto';
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

  async mappingRequestToDTO(newStaffLabRequest: StaffLabRequest) {
    const staff = await this.staffRepository.findOne({
      where: {
        id: newStaffLabRequest.staffId,
        isManager: false,
      },
      relations: {
        staffLab: true,
      },
    });
    if (!staff) {
      throw new NotFoundException('Staff id is not exist');
    }
    const lab = await this.labRepository.findOne({
      where: {
        id: newStaffLabRequest.labId,
      },
      relations: {
        staffLab: true,
      },
    });
    if (!lab) {
      throw new NotFoundException('Lab id is not exist');
    }
    return {
      staff,
      lab,
      isLead: newStaffLabRequest.isLead,
    };
  }

  async createStaffLab(newStaffLabRequest: StaffLabRequest) {
    try {
      const mapped = await this.mappingRequestToDTO(newStaffLabRequest);
      const added = await this.staffLabRepository.save(mapped);
      return { msg: 'Sucessfully add staff to lab' };
    } catch (error) {
      return error.response;
    }
  }

  async removeStaffLab(newStaffLabRequest: StaffLabUpdate) {
    const mapped = await this.mappingRequestToDTO(newStaffLabRequest);
    const staffLab = await this.staffLabRepository.findOne({
      where: {
        staff: mapped.staff,
        lab: mapped.lab,
      },
    });
    await this.staffLabRepository.delete(staffLab);
    return { msg: 'Sucessfully deleted staff in lab' };
  }

  async updateStaffLab(updatedStaffLab: StaffLabUpdate) {
    const mapped = await this.mappingRequestToDTO(updatedStaffLab);
    const staffLabFound = await this.staffLabRepository.findOne({
      where: {
        staff: mapped.staff,
        lab: mapped.lab,
      },
    });
    await this.staffLabRepository.save({
      ...staffLabFound,
      ...mapped,
    });
    return { msg: 'Sucessfully update instrument in method' };
  }

  async getOne(uuid: string) {
    const lab = (await this.labRepository.findOne({
      where: {
        id: uuid,
      },
      relations: {
        staffLab: true,
      },
    })) as Lab;
    const staffLab = await this.staffLabRepository.find({
      where: {
        lab: lab,
      },
      relations: {
        staff: true,
      },
    });
    const staffs: Staff[] = staffLab.map((value) => value.staff);
    return { lab, staffs };
  }
}
