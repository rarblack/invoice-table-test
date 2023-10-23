import { NextResponse } from 'next/server'
import { ContextType } from '@/interfaces/server/common';

import dataset from '@/database/customer/dataset.json';

async function GET(request: Request, context: ContextType): Promise<NextResponse> {
  const { customers } = dataset;

  const status = customers ? 200 : 404;

  return NextResponse.json(
    { customers },
    { status }
  );
}

export { GET };