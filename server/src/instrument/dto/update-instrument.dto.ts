import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateInstrument {
  @IsString()
  @IsOptional()
  instrumentName: string;

  @IsString()
  @IsOptional()
  instrumentModel: string;

  @IsString()
  @IsOptional()
  instrumentSeriNo: string;

  @IsDateString()
  @IsOptional()
  instrumentBuyDate: string;

  @IsDateString()
  @IsOptional()
  instrumentCalibrationDate: string;

  @IsDateString()
  @IsOptional()
  instrumentNextCalibrationDate: string;

  @IsString()
  @IsOptional()
  instrumentStatus: string;

  @IsString()
  @IsOptional()
  instrumentProvider: string;

  @IsString()
  @IsOptional()
  instrumentSupervisor: string;

  @IsBoolean()
  @IsOptional()
  instrumentServer: boolean;
}
