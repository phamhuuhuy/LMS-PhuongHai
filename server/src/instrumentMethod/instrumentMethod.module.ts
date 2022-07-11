import { Module } from '@nestjs/common';
import { InstrumentMethodProvider } from './instrumentMethod.provider';
import { DatabaseModule } from 'src/database/database.module';
import { InstrumentMethodService } from './instrumentMethod.service';
import { InstrumentMethodController } from './instrumentMethod.controller';
import { MethodProvider } from 'src/method/method.provider';
import { InstrumentProvider } from 'src/instrument/instrument.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...InstrumentMethodProvider,
    ...MethodProvider,
    ...InstrumentProvider,
    InstrumentMethodService,
  ],
  controllers: [InstrumentMethodController],
})
export class InstrumentMethodModule {}
