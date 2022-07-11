import { IsBoolean, IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateMethod {
  @IsString()
  @IsOptional()
  methodTargets: string;

  @IsString()
  @IsOptional()
  methodName: string;

  @IsString()
  @IsOptional()
  methodDetail: string;

  @IsString()
  @IsOptional()
  methodScope: string;

  @IsDateString()
  @IsOptional()
  methodTime: string;

  @IsString()
  @IsOptional()
  methodFileUrl: string;
}
