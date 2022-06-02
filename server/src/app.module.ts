import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { InstrumentModule } from './instrument/instrument.module';
import { ChemicalModule } from './chemical/chemical.module';

@Module({
  imports: [CustomerModule, InstrumentModule, ChemicalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
