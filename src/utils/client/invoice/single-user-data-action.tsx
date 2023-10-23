import { InvoiceExtended, InvoiceServerResponse } from "@/interfaces/server/invoice";


async function getSingleUserInvoicesFromApi (userId: string): Promise<InvoiceServerResponse> {
  const url = `/api/invoices/${userId}?sortBy=number&sortOrder=asc`;

  const response = await fetch(
    url,
    {
      method: "GET",
      cache: "no-store"
    }
  )

  const { data } = await response.json();
  const status = response.status;

  return {
    data, 
    status
  };
}

async function deleteSingleUserInvoiceFromApi (userId: string, invoiceId: string) {
  const url = `/api/invoices/${userId}/${invoiceId}`;

  const response = await fetch(
    url,
    {
      method: "DELETE",
    }
  )

  const { status } = response;
  
  return status;
}

export {
  getSingleUserInvoicesFromApi,
  deleteSingleUserInvoiceFromApi
}

  
