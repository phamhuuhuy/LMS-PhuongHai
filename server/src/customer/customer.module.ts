import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { StaffLabModule } from 'src/staffLab/staffLab.module';
import { CustomerController } from './customer.controller';
import { CustomerProvider } from './customer.provider';
import { CustomerService } from './customer.service';

@Module({
  imports: [DatabaseModule, StaffLabModule],
  controllers: [CustomerController],
  providers: [CustomerService, ...CustomerProvider],
})
export class CustomerModule {}
