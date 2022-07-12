import { IsInt, IsString } from 'class-validator';
import { Chemical } from 'src/chemical/chemical.entity';
import { Method } from 'src/method/method.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('chemical_method')
export class ChemicalMethod {
  @PrimaryColumn()
  method_id: string;

  @PrimaryColumn()
  chemical_id: string;

  @ManyToOne(() => Method, (method: Method) => method.id)
  @JoinColumn({ name: 'method_id' })
  method: Method;

  @ManyToOne(() => Chemical, (chemical: Chemical) => chemical.id)
  @JoinColumn({ name: 'chemical_id' })
  chemical: Chemical;

  @Column({ name: 'note' })
  @IsString()
  note: string;

  @Column({ name: 'quantity' })
  @IsInt()
  quantity: number;
}
