import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { ChemicalMethod } from 'src/chemicalMethod/chemicalMethod.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Chemical {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'chemical_name' })
  @IsString()
  chemicalName: string;

  @Column({ name: 'chemical_model' })
  @IsString()
  chemicalModel: string;

  @Column({ name: 'chemical_unit' })
  @IsString()
  chemicalUnit: string;

  @Column({ name: 'chemical_import_date', type: 'date' })
  @IsDateString()
  chemicalImportDate: string;

  @Column({ name: 'chemical_quantity', type: 'float' })
  @IsNumber()
  chemicalQuantity: number;

  @Column({ name: 'chemical_due_date', type: 'date' })
  @IsDateString()
  chemicalDueDate: string;

  @Column({ name: 'chemical_export_date', type: 'date' })
  @IsDateString()
  chemicalExportDate: string;

  @Column({ name: 'chemical_receiver' })
  @IsString()
  chemicalReceiver: string;

  @OneToMany(
    () => ChemicalMethod,
    (chemicalMethod: ChemicalMethod) => chemicalMethod.chemical,
  )
  chemicalMethod: ChemicalMethod[];
}
