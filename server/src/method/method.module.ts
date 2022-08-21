import { Module } from '@nestjs/common';
import { MethodProvider } from './method.provider';
import { MethodService } from './method.service';
import { MethodController } from './method.controller';
import { DatabaseModule } from 'src/database/database.module';
import { InstrumentMethodProvider } from 'src/instrumentMethod/instrumentMethod.provider';
import { InstrumentMethodModule } from 'src/instrumentMethod/instrumentMethod.module';
import { InstrumentService } from 'src/instrument/instrument.service';
import { ChemicalMethodProvider } from 'src/chemicalMethod/chemicalMethod.provider';

@Module({
  imports: [DatabaseModule, InstrumentMethodModule],
  providers: [
    ...MethodProvider,
    ...InstrumentMethodProvider,
    ...ChemicalMethodProvider,
    MethodService,
  ],
  controllers: [MethodController],
})
export class MethodModule {}
