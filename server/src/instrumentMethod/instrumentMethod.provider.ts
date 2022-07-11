import { Connection } from 'typeorm';
import { InstrumentMethod } from './instrumentMethod.entity';

export const InstrumentMethodProvider = [
  {
    provide: 'INSTRUMENT_METHOD_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(InstrumentMethod),
    inject: ['DATABASE_CONNECTION'],
  },
];
