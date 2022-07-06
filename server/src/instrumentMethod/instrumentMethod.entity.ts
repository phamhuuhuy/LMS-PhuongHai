import { IsInt, IsString } from 'class-validator';
import { Instrument } from 'src/instrument/instrument.entity';
import { Method } from 'src/method/method.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('instrument_method')
export class InstrumentMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Method, (method: Method) => method.id)
  method: Method;

  @ManyToOne(() => Instrument, (instrument: Instrument) => instrument.id)
  instrument: Instrument;

  @Column({ name: 'note' })
  @IsString()
  note: string;

  @Column({ name: 'quantity' })
  @IsInt()
  quantity: number;
}
