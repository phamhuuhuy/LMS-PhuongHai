import { Module } from '@nestjs/common';
import { instrumentProvider } from './instrument.provider';
import { InstrumentService } from './instrument.service';
import { InstrumentController } from './instrument.controller';
import { DatabaseModule } from 'src/database/database.module';


@Module({
  imports: [DatabaseModule],
  providers: [...instrumentProvider, InstrumentService],
  controllers: [InstrumentController]
})
export class InstrumentModule {}
