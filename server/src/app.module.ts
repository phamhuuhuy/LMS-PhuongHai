import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { InstrumentModule } from './instrument/instrument.module';
import { ChemicalModule } from './chemical/chemical.module';
import { StaffModule } from './staff/staff.module';
import { LabModule } from './lab/lab.module';
import { MethodModule } from './method/method.module';
import { InstrumentMethodModule } from './instrumentMethod/instrumentMethod.module';
import { ChemicalMethodModule } from './chemicalMethod/chemicalMethod.module';

@Module({
  imports: [
    CustomerModule,
    InstrumentModule,
    ChemicalModule,
    StaffModule,
    LabModule,
    MethodModule,
    InstrumentMethodModule,
    ChemicalMethodModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
