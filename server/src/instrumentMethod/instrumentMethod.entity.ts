import { IsInt, IsString } from 'class-validator';
import { Instrument } from 'src/instrument/instrument.entity';
import { Method } from 'src/method/method.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('instrument_method')
export class InstrumentMethod {
  @PrimaryColumn()
  method_id: string;

  @PrimaryColumn()
  instrument_id: string;

  @ManyToOne(() => Method, (method: Method) => method.id)
  @JoinColumn({ name: 'method_id' })
  method: Method;

  @ManyToOne(() => Instrument, (instrument: Instrument) => instrument.id)
  @JoinColumn({ name: 'instrument_id' })
  instrument: Instrument;

  @Column({ name: 'note' })
  @IsString()
  note: string;

  @Column({ name: 'quantity' })
  @IsInt()
  quantity: number;
}
