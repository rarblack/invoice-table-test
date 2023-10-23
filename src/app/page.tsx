'use client'
import { useContext, useEffect } from "react";
import {
  Heading,
  Text,
} from "@chakra-ui/react";
import { PageWrapper } from "./components/pageWrapper";
import { GeneralBox } from "./components/generalBox";
import CommonContext from "@/contexts/common";
import InvoiceTable from "./components/table/invoice/invoiceTable";
import InvoiceStatisticsTable from "./components/table/invoice/invoiceStatisticsTable";


function Home() {
  const {
    customer,
    stableInit
  } = useContext(CommonContext);

  useEffect(
    () => {
      stableInit();
    }, [stableInit]
  );

  return (
    <>
      <PageWrapper>

        <GeneralBox>
          <Heading as="h2" size="lg">Invoices</Heading>
          <Text>Displaying invoices for <strong>{customer?.name}</strong></Text>
        </GeneralBox>

        <InvoiceTable />

        <InvoiceStatisticsTable />

      </PageWrapper>
    </>
  )
}

export default Home;
