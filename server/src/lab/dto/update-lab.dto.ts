import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateLab {
  @IsString()
  @IsOptional()
  labName: string;
}
