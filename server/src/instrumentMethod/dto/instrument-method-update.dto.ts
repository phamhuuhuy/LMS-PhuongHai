import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class InstrumentMethodUpdate {
  @IsUUID()
  methodId: string;

  @IsUUID()
  instrumentId: string;

  @IsString()
  @IsOptional()
  note: string;

  @IsInt()
  @IsOptional()
  quantity: number;
}
