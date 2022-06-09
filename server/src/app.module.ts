import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { InstrumentModule } from './instrument/instrument.module';
import { ChemicalModule } from './chemical/chemical.module';
import { StaffModule } from './staff/staff.module';

@Module({
  imports: [CustomerModule, InstrumentModule, ChemicalModule, StaffModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
