import { Connection } from 'typeorm';
import { Chemical } from './chemical.entity';

export const ChemicalProvider = [
  {
    provide: 'CHEMICAL_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Chemical),
    inject: ['DATABASE_CONNECTION'],
  },
];
