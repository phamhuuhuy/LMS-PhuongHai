import { Chemical } from 'src/chemical/chemical.entity';
import { Instrument } from 'src/instrument/instrument.entity';

export class MethodResponse {
  id: string;

  methodTargets: string;

  methodName: string;

  methodDetail: string;

  methodScope: string;

  methodTime: string;

  methodFileUrl: string;
  instruments: Instrument[];
  chemicals: Chemical[];
}
