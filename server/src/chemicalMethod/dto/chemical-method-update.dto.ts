import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class ChemicalMethodUpdate {
  @IsUUID()
  methodId: string;

  @IsUUID()
  chemicalId: string;

  @IsString()
  @IsOptional()
  note: string;

  @IsInt()
  @IsOptional()
  quantity: number;
}
