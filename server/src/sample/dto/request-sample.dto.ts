import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class RequestSample {
  @IsString()
  sampleNote: string;
  @IsUUID()
  customerId: string;
  @IsUUID()
  labId: string;
}
