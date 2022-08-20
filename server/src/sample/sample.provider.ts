import { Connection } from 'typeorm';
import { Sample } from './sample.entity';

export const SampleProvider = [
  {
    provide: 'SAMPLE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Sample),
    inject: ['DATABASE_CONNECTION'],
  },
];
