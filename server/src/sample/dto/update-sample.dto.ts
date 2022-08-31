import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { Status } from './status.enum';

export class UpdateSample {
  @IsString()
  @IsOptional()
  sampleName?: string;
  @IsDateString()
  @IsOptional()
  sampleReceivedDate?: string;
  @IsString()
  @IsOptional()
  sampleNote?: string;
  @IsEnum(Status)
  @IsOptional()
  sampleStatus?: string;
  @IsString()
  @IsOptional()
  labId: string;
  @IsString()
  @IsOptional()
  customerId: string;
}
