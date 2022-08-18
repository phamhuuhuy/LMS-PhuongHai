import { Staff } from 'src/staff/staff.entity';

export class LabResponse {
  id: string;

  labName: string;

  subLab: string;

  certification: string;

  lead: Staff;

  staffs: Staff[];
}
