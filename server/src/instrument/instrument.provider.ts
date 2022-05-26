import { Connection } from "typeorm";
import { Instrument } from "./instrument.entity";

export const instrumentProvider = [
    {
        provide: 'INSTRUMENT_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Instrument),
        inject: ['DATABASE_CONNECTION'],
    }
]