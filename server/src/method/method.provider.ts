import { Connection } from 'typeorm';
import { Method } from './method.entity';

export const MethodProvider = [
  {
    provide: 'METHOD_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Method),
    inject: ['DATABASE_CONNECTION'],
  },
];
