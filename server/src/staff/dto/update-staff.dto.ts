import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateStaff {
  @IsString()
  @IsOptional()
  employeeUserName: string;

  @IsString()
  @IsOptional()
  employeePassword: string;

  @IsString()
  @IsOptional()
  employeeName: string;

  @IsString()
  @IsOptional()
  employeeLab: string;

  @IsBoolean()
  @IsOptional()
  isManager: boolean;
}
