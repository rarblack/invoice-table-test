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

async function GET(request: Request, context: ContextType): Promise<NextResponse> {
  const userId = extractUserIdFromContext(context);

  let { invoices } = dataset; 
  
  invoices = filterDatasetByUserId(invoices, userId);
  
  invoices = sortDataset(invoices, request);

  invoices = mapNewFieldsAndUpdateExistingValues(invoices);
  
  return NextResponse.json(
    { 
      invoices
    }
  );
};

export { GET };