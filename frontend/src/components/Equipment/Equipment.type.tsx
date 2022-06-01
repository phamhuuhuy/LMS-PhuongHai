export type Equipment = {
  equipmentName?: string;
  equipmentModel?: string;
  seriNumber?: string;
  dateBuy?: string | null;
  dateCalibrate?: string | null;
  dateRecalibrate?: string | null;
  equipmentStatus?: EquipmentStatus | "";
  infoProvider?: string;
  employeeManagement?: string;
  server?: string;
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
