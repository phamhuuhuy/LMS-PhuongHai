export type Sample = {
  sampleName?: string;
  sampleNote?: string;
  labId?: string;
  customerId?: string;
};

export interface ICustomerFetch {
  id: string;
  customerName: string;
  customerType: string;
  customerContact: string;
  customerPhone: string;
  customerEmail: string;
  customerNote?: string;
}
