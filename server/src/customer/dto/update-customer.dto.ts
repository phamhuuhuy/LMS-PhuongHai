import { IsOptional, IsString } from 'class-validator';

export class UpdateCustomer {
  @IsString()
  @IsOptional()
  customerName?: string;
  @IsString()
  @IsOptional()
  customerType?: string;
  @IsString()
  @IsOptional()
  customerContact?: string;
  @IsString()
  @IsOptional()
  customerPhone?: string;
  @IsString()
  @IsOptional()
  customerEmail?: string;
  @IsString()
  @IsOptional()
  customerNote?: string;
}
