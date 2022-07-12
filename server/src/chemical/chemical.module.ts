import { Module } from '@nestjs/common';
import { ChemicalMethodProvider } from 'src/chemicalMethod/chemicalMethod.provider';
import { DatabaseModule } from 'src/database/database.module';
import { ChemicalController } from './chemical.controller';
import { ChemicalProvider } from './chemical.provider';
import { ChemicalService } from './chemical.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ChemicalController],
  providers: [ChemicalService, ...ChemicalProvider, ...ChemicalMethodProvider],
})
export class ChemicalModule {}
