import { Connection } from 'typeorm';
import { StaffLab } from './staffLab.entity';

export const StaffLabProvider = [
  {
    provide: 'STAFF_LAB_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(StaffLab),
    inject: ['DATABASE_CONNECTION'],
  },
];
