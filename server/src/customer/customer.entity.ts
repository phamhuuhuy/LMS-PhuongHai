import { IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'customer_name'})
    @IsString()
    customerName: string;

    @Column({name: 'customer_type'})
    customerType: string;

    @Column({name: 'customer_contact'})
    customerContact: string;

    @Column({name: 'customer_phone'})
    customerPhone: string;

    @Column({name: 'customer_email'})
    customerEmail: string;

    @Column({name: 'customer_note'})
    customerNote: string;
}