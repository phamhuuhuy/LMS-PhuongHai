import { Connection } from 'typeorm';
import { Lab } from './lab.entity';

export const LabProvider = [
  {
    provide: 'LAB_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Lab),
    inject: ['DATABASE_CONNECTION'],
  },
];
