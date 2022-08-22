import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Lab } from 'src/lab/lab.entity';
import { StaffLab } from 'src/staffLab/staffLab.entity';
import EncryptValue from 'src/utils/encrypt.util';
import { Repository } from 'typeorm';
import { StaffResponse, UpdateStaff } from './dto';
import { Staff } from './staff.entity';

@Injectable()
export class StaffService {
  constructor(
    @Inject('STAFF_REPOSITORY')
    private staffRepository: Repository<Staff>,

    @Inject('STAFF_LAB_REPOSITORY')
    private staffLabRepository: Repository<StaffLab>,
  ) {}

  async getAll(): Promise<Staff[]> {
    return await this.staffRepository.find();
  }

  async getAllStaffNotInLab(uuid: String, role: boolean): Promise<Staff[]> {
    const staffs = await this.staffRepository.find({
      where: {
        isManager: false,
      },
      relations: {
        staffLab: true,
      },
    });
    const result: Staff[] = [];
    for (const staff of staffs) {
      if (staff.staffLab.length == 0) {
        result.push(staff);
        continue;
      }
      const labId = staff.staffLab.find((staffLab) => {
        return staffLab.lab_id == uuid;
      });
      if (labId == undefined) {
        result.push(staff);
        continue;
      }

      const staffLab = await this.staffLabRepository.findOne({
        where: {
          staff_id: staff.id,
        },
      });
      if (staff.id == staffLab.staff_id) {
        continue;
      }
      result.push(staff);
    }

    if (role) {
      return result.filter(
        (staff) => !staff.staffLab.find((staffLab) => !staffLab.isLead),
      );
    }
    return result.filter(
      (staff) => !staff.staffLab.find((staffLab) => staffLab.isLead),
    );
  }

  async createStaff(newStaff: Staff): Promise<Staff> {
    const staff = await this.staffRepository.findOne({
      where: {
        employeeUserName: newStaff.employeeUserName,
      },
    });
    newStaff.employeePassword = await EncryptValue(newStaff.employeePassword);
    if (!staff) {
      return this.staffRepository.save(newStaff);
    } else {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'User name must be unique',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async getOne(uuid: string): Promise<StaffResponse> {
    const staff = await this.staffRepository.findOne({
      where: {
        id: uuid,
      },
      relations: {
        staffLab: true,
      },
    });
    if (!staff) {
      throw new NotFoundException('Stab id is not exist');
    }
    const staffLab = await this.staffLabRepository.find({
      where: {
        staff: staff,
      },
      relations: {
        lab: true,
      },
    });
    const labs: Lab[] = staffLab.map((value: StaffLab) => value.lab);
    return {
      id: staff.id,
      employeeUserName: staff.employeeUserName,
      employeePassword: staff.employeePassword,
      employeeName: staff.employeeName,
      isManager: staff.isManager,
      labs,
    };
  }

  async findOne(userName: string): Promise<Staff> {
    const staff = await this.staffRepository.findOneBy({
      employeeUserName: userName,
    });

    return staff;
  }

  async updateStaff(uuid: string, updatedStaff: UpdateStaff): Promise<Staff> {
    if (updatedStaff.employeePassword) {
      updatedStaff.employeePassword = await EncryptValue(
        updatedStaff.employeePassword,
      );
    }
    const staffFound = await this.getOne(uuid);
    const staff = await this.staffRepository.save({
      ...staffFound,
      ...updatedStaff,
    });
    return staff;
  }

  async deleteStaff(uuid: string) {
    const staff = await this.getOne(uuid);
    await this.staffRepository.delete(staff.id);
    return { msg: 'Sucessfully deleted staff' };
  }
}
