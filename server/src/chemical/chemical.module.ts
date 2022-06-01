import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ChemicalController } from './chemical.controller';
import { ChemicalProvider } from './chemical.provider';
import { ChemicalService } from './chemical.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ChemicalController],
  providers: [ChemicalService, ...ChemicalProvider],
})
export class ChemicalModule {}
