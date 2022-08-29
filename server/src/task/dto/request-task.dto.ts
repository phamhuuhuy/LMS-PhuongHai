import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Status } from 'src/sample/dto/status.enum';

export class RequestTask {
  @IsString()
  taskName: string;

  @IsString()
  taskNote: string;

  @IsUUID()
  sampleId: string;

  @IsUUID()
  staffId: string;

  @IsUUID()
  methodId: string;
}
