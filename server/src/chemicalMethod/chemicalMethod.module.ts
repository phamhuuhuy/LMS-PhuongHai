import { Module } from '@nestjs/common';
import { ChemicalMethodProvider } from './chemicalMethod.provider';
import { DatabaseModule } from 'src/database/database.module';
import { MethodProvider } from 'src/method/method.provider';
import { ChemicalMethodService } from './chemicalMethod.service';
import { ChemicalMethodController } from './chemicalMethod.controller';
import { ChemicalProvider } from 'src/chemical/chemical.provider';
import { StaffLabModule } from 'src/staffLab/staffLab.module';

@Module({
  imports: [DatabaseModule, StaffLabModule],
  providers: [
    ...ChemicalMethodProvider,
    ...MethodProvider,
    ...ChemicalProvider,
    ChemicalMethodService,
  ],
  controllers: [ChemicalMethodController],
})
export class ChemicalMethodModule {}
