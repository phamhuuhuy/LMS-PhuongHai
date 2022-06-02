import { Module } from '@nestjs/common';
import { InstrumentProvider } from './instrument.provider';
import { InstrumentService } from './instrument.service';
import { InstrumentController } from './instrument.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...InstrumentProvider, InstrumentService],
  controllers: [InstrumentController],
})
export class InstrumentModule {}
