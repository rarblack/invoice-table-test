import { Invoice } from "../database/invoice";
import { ServerResponse } from "./common";

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

interface InvoiceServerResponse extends ServerResponse{
  data: InvoiceExtended[];
}

export type { 
  InvoiceTimestamps,
  InvoiceExtended,
  SortParams,
  InvoiceServerResponse
};
  