import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Status } from 'src/sample/dto/status.enum';

export class UpdateTask {
  @IsString()
  @IsOptional()
  taskName: string;
  @IsEnum(Status)
  @IsOptional()
  taskStatus: string;

  @IsString()
  @IsOptional()
  taskNote: string;

  @IsString()
  @IsOptional()
  taskResult: string;

  @IsDateString()
  @IsOptional()
  taskStartDate: string;

  @IsDateString()
  @IsOptional()
  taskEndDate: string;

  @IsOptional()
  @IsUUID()
  sampleId: string;

  @IsUUID()
  @IsOptional()
  staffId: string;

  @IsUUID()
  @IsOptional()
  methodId: string;
}
