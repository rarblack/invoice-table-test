import { NextResponse } from 'next/server'
import { ContextType } from '@/interfaces/server/common';
import dataset from '@/database/invoice/dataset.json';
import { extractParamsFromUrl, sort } from '@/helpers/server/common';
import { Invoice } from '@/interfaces/database/invoice';

async function GET(request: Request, context: ContextType): Promise<NextResponse> {
  let { invoices } = dataset; 
  
  const sortBy = extractParamsFromUrl(request).get("sortBy");
  const sortOrder = extractParamsFromUrl(request).get("sortOrder");

  if (sortBy || sortOrder) {
    invoices = sort<Invoice, any>(invoices, sortBy, sortOrder);
  }

  return NextResponse.json(
    { 
      invoices
    }
  );
};

export { GET };