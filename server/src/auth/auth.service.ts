import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Staff } from 'src/staff/staff.entity';
import { StaffService } from 'src/staff/staff.service';
import { DecryptValue } from 'src/utils/encrypt.util';

@Injectable()
export class AuthService {
  constructor(
    private staffService: StaffService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.staffService.findOne(username);
    if (user) {
      const validPassword = await DecryptValue(password, user.employeePassword);
      if (validPassword) {
        return user;
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
