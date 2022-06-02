import { Connection } from 'typeorm';
import { Customer } from './customer.entity';

export const CustomerProvider = [
  {
    provide: 'CUSTOMER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Customer),
    inject: ['DATABASE_CONNECTION'],
  },
];
