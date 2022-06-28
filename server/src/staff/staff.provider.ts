import { Connection } from 'typeorm';
import { Staff } from './staff.entity';

export const StaffProvider = [
  {
    provide: 'STAFF_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Staff),
    inject: ['DATABASE_CONNECTION'],
  },
];
