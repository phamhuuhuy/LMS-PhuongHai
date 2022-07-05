import { IsInt, IsString, IsUUID } from 'class-validator';

export class InstrumentMethodRequest {
  @IsUUID()
  methodId: string;

  @IsUUID()
  instrumentId: string;

  @IsString()
  note: string;

  @IsInt()
  quantity: number;
}
