import { IsOptional, IsString } from 'class-validator';

export class UpdateLab {
  @IsString()
  @IsOptional()
  labName: string;

  @IsString()
  @IsOptional()
  subLab: string;

  @IsString()
  @IsOptional()
  certification: string;
}
