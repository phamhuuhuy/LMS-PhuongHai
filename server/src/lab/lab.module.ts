import { Module } from '@nestjs/common';
import { LabProvider } from './lab.provider';
import { LabService } from './lab.service';
import { LabController } from './lab.controller';
import { DatabaseModule } from 'src/database/database.module';
import { StaffLabModule } from 'src/staffLab/staffLab.module';

@Module({
  imports: [DatabaseModule, StaffLabModule],
  providers: [...LabProvider, LabService],
  controllers: [LabController],
})
export class LabModule {}
