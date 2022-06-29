import { Module } from '@nestjs/common';
import { LabProvider } from './lab.provider';
import { LabService } from './lab.service';
import { LabController } from './lab.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...LabProvider, LabService],
  controllers: [LabController],
})
export class LabModule {}
