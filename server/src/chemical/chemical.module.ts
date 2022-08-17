import { Module } from '@nestjs/common';
import { ChemicalMethodProvider } from 'src/chemicalMethod/chemicalMethod.provider';
import { DatabaseModule } from 'src/database/database.module';
import { StaffLabModule } from 'src/staffLab/staffLab.module';
import { ChemicalController } from './chemical.controller';
import { ChemicalProvider } from './chemical.provider';
import { ChemicalService } from './chemical.service';

@Module({
  imports: [DatabaseModule, StaffLabModule],
  controllers: [ChemicalController],
  providers: [ChemicalService, ...ChemicalProvider, ...ChemicalMethodProvider],
})
export class ChemicalModule {}
