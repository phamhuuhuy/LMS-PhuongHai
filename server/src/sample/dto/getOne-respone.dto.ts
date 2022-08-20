import { Customer } from 'src/customer/customer.entity';
import { Lab } from 'src/lab/lab.entity';
import { Staff } from 'src/staff/staff.entity';

export class GetOneSampleResponse {
  id: string;

  sampleReceivedDate: string;

  sampleReturnedResultDate: string;

  sampleNote: string;

  sampleStatus: string;

  customer: Customer;

  lead: Staff;

  lab: Lab;
}
