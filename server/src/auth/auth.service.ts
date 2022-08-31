import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Staff } from 'src/staff/staff.entity';
import { StaffService } from 'src/staff/staff.service';
import { StaffLab } from 'src/staffLab/staffLab.entity';
import { StaffLabService } from 'src/staffLab/staffLab.service';
import { DecryptValue } from 'src/utils/encrypt.util';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private staffService: StaffService,
    private jwtService: JwtService,
    @Inject('STAFF_LAB_REPOSITORY')
    private staffLabRepository: Repository<StaffLab>,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.staffService.findOne(username);
    if (user) {
      const validPassword = await DecryptValue(password, user.employeePassword);
      if (validPassword) {
        const staffLab = await this.staffLabRepository.findOne({
          where: {
            staff_id: user.id,
            isLead: true,
          },
        });
        if (staffLab) {
          return { ...user, isLead: true };
        } else {
          return { ...user, isLead: false };
        }
      }
    }
    return null;
  }

  async login(user: Staff) {
    const { employeePassword, id, ...rest } = user;
    const payload = { sub: user.id, ...rest };
    return {
      access_token: this.jwtService.sign(payload),
      payload: user,
    };
  }
}
