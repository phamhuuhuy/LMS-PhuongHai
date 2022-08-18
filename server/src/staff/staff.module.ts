import { Module } from '@nestjs/common';
import { StaffProvider } from './staff.provider';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { DatabaseModule } from 'src/database/database.module';
import { StaffLabModule } from 'src/staffLab/staffLab.module';
import { StaffLabProvider } from 'src/staffLab/staffLab.provider';

@Module({
  imports: [DatabaseModule, StaffLabModule],
  providers: [...StaffProvider, ...StaffLabProvider, StaffService],
  controllers: [StaffController],
  exports: [StaffService],
})
export class StaffModule {}
