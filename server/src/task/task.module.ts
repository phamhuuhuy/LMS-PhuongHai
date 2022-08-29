import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LabModule } from 'src/lab/lab.module';
import { CustomerModule } from 'src/customer/customer.module';
import { LabProvider } from 'src/lab/lab.provider';
import { CustomerProvider } from 'src/customer/customer.provider';
import { StaffLabModule } from 'src/staffLab/staffLab.module';
import { StaffProvider } from 'src/staff/staff.provider';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskProvider } from './task.provider';
import { SampleProvider } from 'src/sample/sample.provider';
import { MethodProvider } from 'src/method/method.provider';

@Module({
  imports: [DatabaseModule, StaffLabModule],
  controllers: [TaskController],
  providers: [
    TaskService,
    ...StaffProvider,
    ...TaskProvider,
    ...SampleProvider,
    ...MethodProvider,
  ],
})
export class TaskModule {}
