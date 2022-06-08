import { Module } from '@nestjs/common';
import { StaffProvider } from './staff.provider';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...StaffProvider, StaffService],
  controllers: [StaffController],
})
export class StaffModule {}
