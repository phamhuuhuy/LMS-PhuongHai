import { IsString } from 'class-validator';
import { Sample } from 'src/sample/sample.entity';
import { StaffLab } from 'src/staffLab/staffLab.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lab {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ name: 'lab_name' })
  @IsString()
  labName: string;

  @Column({ name: 'sub_lab' })
  @IsString()
  subLab: string;

  @Column({ name: 'certification' })
  @IsString()
  certification: string;

  @OneToMany(() => StaffLab, (staffLab: StaffLab) => staffLab.lab)
  staffLab: StaffLab[];

  @OneToMany(() => Sample, (sample: Sample) => sample.lab)
  samples: Sample[];
}
