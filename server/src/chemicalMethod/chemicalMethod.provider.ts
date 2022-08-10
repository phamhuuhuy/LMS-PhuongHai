import { Connection } from 'typeorm';
import { ChemicalMethod } from './chemicalMethod.entity';

export const ChemicalMethodProvider = [
  {
    provide: 'CHEMICAL_METHOD_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(ChemicalMethod),
    inject: ['DATABASE_CONNECTION'],
  },
];
