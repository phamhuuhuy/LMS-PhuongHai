import { Module } from '@nestjs/common';
import { LabProvider } from './lab.provider';
import { LabService } from './lab.service';
import { LabController } from './lab.controller';
import { DatabaseModule } from 'src/database/database.module';
import { StaffLabModule } from 'src/staffLab/staffLab.module';
import { StaffLabProvider } from 'src/staffLab/staffLab.provider';
import { StaffProvider } from 'src/staff/staff.provider';

@Module({
  imports: [DatabaseModule, StaffLabModule],
  providers: [
    ...LabProvider,
    ...StaffLabProvider,
    ...StaffProvider,
    LabService,
  ],
  controllers: [LabController],
})
export class LabModule {}
