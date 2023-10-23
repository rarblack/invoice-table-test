import { Invoice } from "../database/invoice";

interface InvoiceTimestamps {
    dateIssued: string,
    dateDue: string
}

interface InvoiceExtended extends Invoice {
  status: string;
  amount: number;
}

interface SortParams {
  sortBy: string | null,
  sortOrder: string | null
}

export type { 
  InvoiceTimestamps,
  InvoiceExtended,
  SortParams
};
  