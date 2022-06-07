export type Chemical = {
  chemicalName: String;
  chemicalModel: String;
  chemicalUnit: String;
  chemicalImportDate: String | null;
  chemicalQuantity: string;
  chemicalDueDate: String | null;
  chemicalExportDate: String | null;
  chemicalReceiver: String;
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
