import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'employee_username' })
  @IsString()
  employeeUserName: string;

  @Column({ name: 'employee_password' })
  @IsString()
  employeePassword: string;

  @Column({ name: 'employee_name' })
  @IsString()
  employeeName: string;

  @Column({ name: 'employee_lab' })
  @IsString()
  employeeLab: string;

  @Column({ name: 'is_manager' })
  @IsBoolean()
  isManager: boolean;
}
