import { IsInt, IsString, IsUUID } from 'class-validator';

export class ChemicalMethodRequest {
  @IsUUID()
  methodId: string;

  @IsUUID()
  chemicalId: string;

  @IsString()
  note: string;

  @IsInt()
  quantity: number;
}
