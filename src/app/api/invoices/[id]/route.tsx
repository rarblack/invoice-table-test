import { NextResponse } from 'next/server'
import { Invoice } from '@/interfaces/database/invoice';
import { ContextType } from '@/interfaces/server/common';
import { 
  filterDatasetByUserId,
  getSortParams,
  mapNewFieldsAndUpdateExistingValues,
} from '@/helpers/server/invoice';
import { sort } from '@/helpers/server/common';

 import dataset from '@/database/invoice/dataset.json';
import { InvoiceExtended } from '@/interfaces/server/invoice';

function sortDataset(dataset: Invoice[], request: Request) {

  const { sortBy, sortOrder } = getSortParams(request);
  
  if (sortBy || sortOrder) {
    const sorted = sort<Invoice, any>(dataset, sortBy, sortOrder);

    return sorted;
  }

  return dataset;
}

function extractUserIdFromContext(context: ContextType): string {
  const id = context.params.id;
  
  return id;
}

function prepareData(dataset: Invoice[]): InvoiceExtended[] {
  const datasetUpdated = mapNewFieldsAndUpdateExistingValues(dataset);

  return datasetUpdated;
}

async function GET(request: Request, context: ContextType): Promise<NextResponse> {
  const userId: string = extractUserIdFromContext(context);

  const { invoices } = dataset; 
  
  const invoicesFiltered = filterDatasetByUserId(invoices, userId);
  
  const invoicesSorted = sortDataset(invoicesFiltered, request);

  const data = prepareData(invoicesSorted);

  const status: number = invoices ? 200: 400;

  return NextResponse.json(
    { data },
    { status }
  );
};

export { GET };