export type Instrument = {
  instrumentName?: string;
  instrumentModel?: string;
  instrumentSeriNo?: string;
  instrumentBuyDate?: string | null;
  instrumentCalibrationDate?: string | null;
  instrumentNextCalibrationDate?: string | null;
  instrumentStatus?: InstrumentStatus | "";
  instrumentProvider?: string;
  instrumentSupervisor?: string;
  instrumentServer?: string;
};

export type InstrumentError = {
  instrumentName?: string;
  instrumentModel?: string;
  instrumentSeriNo?: string;
  instrumentBuyDate?: string | null;
  instrumentCalibrationDate?: string | null;
  instrumentNextCalibrationDate?: string | null;
  instrumentStatus?: string | "";
  instrumentProvider?: string;
  instrumentSupervisor?: string;
  instrumentServer?: string;
};

export enum InstrumentStatus {
  good = "GOOD",
  bad = "BAD",
}
