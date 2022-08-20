import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Sample } from 'src/sample/sample.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'customer_name' })
  @IsString()
  customerName: string;

  @Column({ name: 'customer_type' })
  @IsString()
  customerType: string;

  @Column({ name: 'customer_contact' })
  @IsString()
  customerContact: string;

  @Column({ name: 'customer_phone' })
  @IsString()
  customerPhone: string;

  @Column({ name: 'customer_email' })
  @IsEmail()
  customerEmail: string;

  @Column({ name: 'customer_note', nullable: true })
  @IsString()
  @IsOptional()
  customerNote: string;

  @OneToMany(() => Sample, (sample: Sample) => sample.customer)
  sample: Sample[];
}
