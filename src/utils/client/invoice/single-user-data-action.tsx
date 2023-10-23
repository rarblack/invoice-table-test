import { InvoiceExtended } from "@/interfaces/server/invoice";


async function getSingleUserInvoicesFromApi (userId: string): Promise<InvoiceExtended[]> {
    const url = `/api/invoices/${userId}?sortBy=number&sortOrder=asc`;

    const response = await fetch(
     url,
      {
        method: "GET",
        cache: "no-store"
      }
    )

    const { invoices } = await response.json();

    return invoices;
  }

async function deleteSingleUserInvoiceFromApi (userId: string, invoiceId: string) {
    const url = `/api/invoices/${userId}/${invoiceId}`;

    const response = await fetch(
     url,
      {
        method: "DELETE",
      }
    )

    const { status } = await response;
    
    return status;
  }

export {
  getSingleUserInvoicesFromApi,
  deleteSingleUserInvoiceFromApi
}

  
