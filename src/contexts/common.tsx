import { generateStatistics } from "@/helpers/client/invoice";
import { ChildrenProps } from "@/interfaces/client/common";
import { ContextShareValues, InvoiceStatistics } from "@/interfaces/client/invoice";
import { Customer } from "@/interfaces/database/customer";
import { InvoiceExtended } from "@/interfaces/server/invoice";
import { getSingleCustomerFromApi } from "@/utils/client/customer/single-user-data-actions";
import { deleteSingleUserInvoiceFromApi, getSingleUserInvoicesFromApi } from "@/utils/client/invoice/single-user-data-action";
import { createContext, useCallback, useState } from "react";

const CommonContext = createContext<ContextShareValues | null>(null);

function Provider({ children }: ChildrenProps ): React.ReactElement {
  const [userId, setUserId] = useState('5ac51f7e-81b1-49c6-9c39-78b2d171abd6');
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [invoices, setInvoices] = useState<InvoiceExtended[] | null>(null);
  const [statistics, setStatistics] = useState<InvoiceStatistics>(
    { 
      totalAmount: 0,
      totalDiscountedAmount: 0,
      totalPaidAmount: 0,
      totalOwedAmount: 0
    }
  );

  async function init() {
    const customerResponse = await getSingleCustomerFromApi(userId);
    setCustomer(customerResponse.data);

    const invoiceResponse = await getSingleUserInvoicesFromApi(userId);
    setInvoices([...invoiceResponse.data]);

    const statistics = generateStatistics(invoiceResponse.data);
    setStatistics(statistics);
  };

  const stableInit = useCallback(
      init,
      []
  );

  async function deleteInvoice(id: string){
    // COMMENT TO CLARIFY
    // if there is real database this logic is ready
    // we are simulating here, but not actually delete from json files
    // every refresh reloads all data

    // const status = deleteSingleUserInvoiceFromApi(userId, id);

    const updatedInvoices = invoices?.filter(
      (invoice) => {
          return invoice.id !== id;
      }
    );

    if (updatedInvoices) 
    {
      setInvoices([...updatedInvoices]);
    }
  }

  const valuesToShare = {
    userId,
    customer,
    invoices,
    statistics,
    stableInit,
    deleteInvoice
  };

  return (
    <CommonContext.Provider value={valuesToShare}>
      {children}
    </CommonContext.Provider>
  );
  
}

export { Provider };
export default CommonContext;
