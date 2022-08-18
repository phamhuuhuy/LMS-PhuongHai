import { Module } from '@nestjs/common';
import { InstrumentProvider } from './instrument.provider';
import { InstrumentService } from './instrument.service';
import { InstrumentController } from './instrument.controller';
import { DatabaseModule } from 'src/database/database.module';
import { InstrumentMethodProvider } from 'src/instrumentMethod/instrumentMethod.provider';
import { StaffLabModule } from 'src/staffLab/staffLab.module';

@Module({
  imports: [DatabaseModule, StaffLabModule],
  providers: [
    ...InstrumentProvider,
    ...InstrumentMethodProvider,
    InstrumentService,
  ],
  controllers: [InstrumentController],
})
export class InstrumentModule {}
