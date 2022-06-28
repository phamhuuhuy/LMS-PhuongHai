export type Chemical = {
  chemicalName: string;
  chemicalModel: string;
  chemicalUnit: string;
  chemicalImportDate: string | null;
  chemicalQuantity: string;
  chemicalDueDate: string | null;
  chemicalExportDate: string | null;
  chemicalReceiver: string;
};

export type ChemicalError = {
  chemicalName?: String;
  chemicalModel?: String;
  chemicalUnit?: String;
  chemicalImportDate?: String;
  chemicalQuantity?: String;
  chemicalDueDate?: String;
  chemicalExportDate?: String;
  chemicalReceiver?: String;
};
