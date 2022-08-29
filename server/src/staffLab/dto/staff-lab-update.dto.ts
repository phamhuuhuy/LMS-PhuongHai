import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class StaffLabUpdate {
  @IsUUID()
  staffId: string;

  @IsUUID()
  labId: string;

  @IsBoolean()
  @IsOptional()
  isLead: boolean;
}
