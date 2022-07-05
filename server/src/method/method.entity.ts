import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';
import { InstrumentMethod } from 'src/instrumentMethod/instrumentMethod.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Method {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'method_targets' })
  @IsString()
  methodTargets: string;

  @Column({ name: 'method_name' })
  @IsString()
  methodName: string;

  @Column({ name: 'method_detail' })
  @IsString()
  methodDetail: string;

  @Column({ name: 'method_scope' })
  @IsString()
  methodScope: string;

  @Column({ name: 'method_time', type: 'date' })
  @IsDateString()
  methodTime: string;

  @Column({ name: 'method_file_url' })
  @IsString()
  methodFileUrl: string;

  @OneToMany(
    () => InstrumentMethod,
    (instrumentMethod: InstrumentMethod) => instrumentMethod.method,
  )
  instrumentMethod: InstrumentMethod[];
}
