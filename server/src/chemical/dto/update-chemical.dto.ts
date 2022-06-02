import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateChemical {
  @IsString()
  @IsOptional()
  chemicalName: string;

  @IsString()
  @IsOptional()
  chemicalModel: string;

  @IsString()
  @IsOptional()
  chemicalUnit: string;

  @IsDateString()
  @IsOptional()
  chemicalImportDate: string;

  @IsNumber()
  @IsOptional()
  chemicalQuantity: number;

  @IsDateString()
  @IsOptional()
  chemicalDueDate: string;

  @IsDateString()
  @IsOptional()
  chemicalExportDate: string;

  @IsString()
  @IsOptional()
  chemicalReceiver: string;
}
