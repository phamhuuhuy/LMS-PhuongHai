import { IsBoolean, IsUUID } from 'class-validator';

export class StaffLabRequest {
  @IsUUID()
  staffId: string;

  @IsUUID()
  labId: string;

  @IsBoolean()
  isLead: boolean;
}
