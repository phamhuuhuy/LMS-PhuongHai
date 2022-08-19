import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';
import { Customer } from 'src/customer/customer.entity';
import { Lab } from 'src/lab/lab.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Sample {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'sample_received_date', type: 'date' })
  sampleReceivedDate: string;

  @Column({ name: 'sample_returned_result_date', type: 'date', nullable: true })
  sampleReturnedResultDate: string;

  @Column({ name: 'sample_note' })
  sampleNote: string;

  @Column({ name: 'sample_status' })
  sampleStatus: string;

  @ManyToOne(() => Customer, (customer: Customer) => customer.id)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => Lab, (lab: Lab) => lab.id)
  @JoinColumn({ name: 'lab_id' })
  lab: Lab;
}
