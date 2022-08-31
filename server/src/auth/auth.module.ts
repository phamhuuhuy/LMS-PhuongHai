import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'src/database/database.module';
import { StaffModule } from 'src/staff/staff.module';
import { StaffLabModule } from 'src/staffLab/staffLab.module';
import { StaffLabProvider } from 'src/staffLab/staffLab.provider';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    StaffModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_TOKEN || 'SECRET',
      signOptions: { expiresIn: '1d' },
    }),
    DatabaseModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, ...StaffLabProvider],
  controllers: [AuthController],
})
export class AuthModule {}
