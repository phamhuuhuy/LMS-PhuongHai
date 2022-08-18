import { Lab } from 'src/lab/lab.entity';
import { Staff } from 'src/staff/staff.entity';

export class StaffResponse {
  id: string;

  employeeUserName: string;

  employeePassword: string;

  employeeName: string;

  isManager: boolean;

  labs: Lab[];
}
