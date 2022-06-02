import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Instrument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'instrument_name' })
  @IsString()
  instrumentName: string;

  @Column({ name: 'instrument_model' })
  @IsString()
  instrumentModel: string;

  @Column({ name: 'instrument_seri_no' })
  @IsString()
  instrumentSeriNo: string;

  @Column({ name: 'instrument_buy_date', type: 'date' })
  @IsDateString()
  instrumentBuyDate: string;

  @Column({ name: 'instrument_calibration_date', type: 'date' })
  @IsDateString()
  instrumentCalibrationDate: string;

  @Column({ name: 'instrument_next_calibration_date', type: 'date' })
  @IsDateString()
  instrumentNextCalibrationDate: string;

  @Column({ name: 'instrument_status' })
  @IsString()
  instrumentStatus: string;

  @Column({ name: 'instrument_provider' })
  @IsString()
  instrumentProvider: string;

  @Column({ name: 'instrument_supervisor' })
  @IsString()
  instrumentSupervisor: string;

  @Column({ name: 'instrument_server', nullable: true })
  @IsBoolean()
  @IsOptional()
  instrumentServer: boolean;
}
