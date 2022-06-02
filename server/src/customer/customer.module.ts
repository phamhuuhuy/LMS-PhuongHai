import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CustomerController } from './customer.controller';
import { CustomerProvider } from './customer.provider';
import { CustomerService } from './customer.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomerController],
  providers: [CustomerService, ...CustomerProvider],
})
export class CustomerModule {}
