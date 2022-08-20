import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SampleController } from './sample.controller';
import { SampleService } from './sample.service';
import { SampleProvider } from './sample.provider';
import { LabModule } from 'src/lab/lab.module';
import { CustomerModule } from 'src/customer/customer.module';
import { LabProvider } from 'src/lab/lab.provider';
import { CustomerProvider } from 'src/customer/customer.provider';
import { StaffLabModule } from 'src/staffLab/staffLab.module';

@Module({
  imports: [DatabaseModule, StaffLabModule],
  controllers: [SampleController],
  providers: [
    SampleService,
    ...SampleProvider,
    ...LabProvider,
    ...CustomerProvider,
  ],
})
export class SampleModule {}
