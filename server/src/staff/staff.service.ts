import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import EncryptValue from 'src/utils/encrypt.util';
import { Repository } from 'typeorm';
import { UpdateStaff } from './dto';
import { Staff } from './staff.entity';

@Injectable()
export class StaffService {
  constructor(
    @Inject('STAFF_REPOSITORY')
    private staffRepository: Repository<Staff>,
  ) {}

  async getAll(): Promise<Staff[]> {
    return await this.staffRepository.find();
  }

  async createStaff(newStaff: Staff): Promise<Staff> {
    newStaff.employeePassword = await EncryptValue(newStaff.employeePassword);
    return this.staffRepository.save(newStaff);
  }

  async getOne(uuid: string): Promise<Staff> {
    const staff = await this.staffRepository.findOneBy({ id: uuid });
    if (!staff) {
      throw new NotFoundException('Staff id is not exist');
    }
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
    await this.staffRepository.delete(staff);
    return { msg: 'Sucessfully deleted staff' };
  }
}
