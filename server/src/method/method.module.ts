import { Module } from '@nestjs/common';
import { MethodProvider } from './method.provider';
import { MethodService } from './method.service';
import { MethodController } from './method.controller';
import { DatabaseModule } from 'src/database/database.module';
import { InstrumentMethodProvider } from 'src/instrumentMethod/instrumentMethod.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...MethodProvider, ...InstrumentMethodProvider, MethodService],
  controllers: [MethodController],
})
export class MethodModule {}
