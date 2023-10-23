import { NextResponse } from 'next/server'
import { ContextType } from '@/interfaces/server/common';
import dataset from "@/database/customer/dataset.json";


async function GET(request: Request, context: ContextType): Promise<NextResponse> {
  const { customers } = dataset;

  const data = customers.find(
      (
        { id }
      ) => id === context.params?.id
    );

  const status = data ? 200 : 404;

  return NextResponse.json(
    { data },
    { status }
  );
}

export { GET };