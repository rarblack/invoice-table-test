import { InvoiceExtended } from "@/interfaces/server/invoice";


async function fetchAllUsersInvoiceData (): Promise<InvoiceExtended[]> {
    const url = `/api/invoices?sortBy=number&sortOrder=asc`;

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

export {
  fetchAllUsersInvoiceData
}

  
