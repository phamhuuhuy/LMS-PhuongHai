export type Equipment = {
  id?: string;
  instrumentName?: string;
  instrumentModel?: string;
  instrumentSeriNo?: string;
  instrumentBuyDate?: string | null;
  instrumentCalibrationDate?: string | null;
  instrumentNextCalibrationDate?: string | null;
  instrumentStatus?: EquipmentStatus | "";
  instrumentProvider?: string;
  instrumentSupervisor?: string;
  instrumentServer?: string;
};

export type EquipmentError = {
  equipmentName?: string;
  equipmentModel?: string;
  seriNumber?: string;
  dateBuy?: string;
  dateCalibrate?: string;
  dateRecalibrate?: string;
  equipmentStatus?: string;
  infoProvider?: string;
  employeeManagement?: string;
};

export enum EquipmentStatus {
  good = "GOOD",
  bad = "BAD",
}
