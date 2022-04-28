import { Customer } from 'src/customer/customer.entity';
import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'phuonghai',
      password: 'phuonghai',
      database: 'lms',
      entities: [
         __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
      
    }),
  },
];