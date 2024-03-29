import { Connection } from 'typeorm';
import { Task } from './task.entity';

export const TaskProvider = [
  {
    provide: 'TASK_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Task),
    inject: ['DATABASE_CONNECTION'],
  },
];
