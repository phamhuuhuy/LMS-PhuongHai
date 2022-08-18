import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { StaffLabProvider } from './staffLab.provider';
import { StaffProvider } from 'src/staff/staff.provider';
import { LabProvider } from 'src/lab/lab.provider';
import { StaffLabService } from './staffLab.service';
import { StaffLabController } from './staffLab.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...StaffLabProvider,
    ...StaffProvider,
    ...LabProvider,
    StaffLabService,
  ],
  controllers: [StaffLabController],
  exports: [StaffLabService],
})
export class StaffLabModule {}
