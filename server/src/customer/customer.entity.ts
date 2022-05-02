import { IsEmail, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  customerNote: string;
}
