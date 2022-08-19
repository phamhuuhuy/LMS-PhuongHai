import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateSample {
  @IsDateString()
  @IsOptional()
  sampleReceivedDate?: string;
  @IsDateString()
  @IsOptional()
  sampleReturnResultDate?: string;
  @IsString()
  @IsOptional()
  sampleNote?: string;
  @IsString()
  @IsOptional()
  sampleStatus?: string;
}
