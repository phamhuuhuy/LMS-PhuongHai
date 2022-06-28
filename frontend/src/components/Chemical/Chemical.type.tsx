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
  chemicalName?: string;
  chemicalModel?: string;
  chemicalUnit?: string;
  chemicalImportDate?: string;
  chemicalQuantity?: string;
  chemicalDueDate?: string;
  chemicalExportDate?: string;
  chemicalReceiver?: string;
};
