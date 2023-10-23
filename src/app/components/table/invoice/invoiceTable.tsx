"use-client"

import CommonContext from "@/contexts/common"
import { useContext } from "react";
import { GeneralBox } from "../../generalBox";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { displayAmount, displayDate } from "@/helpers/client/invoice";
import DeleteModal from "../../modal/invoice/deleteInvoiceModal";


function InvoiceTable() {
    const {
        invoices,
    } = useContext(CommonContext);

    const calculateTextColor: Function = (status: string, discount: number | null): string => {
      if (status === "unpaid" || status === "owed")
      {
        if (discount && discount > 0) {
          return "green";
        }

        return "red";
      }

      return "black";
    }

    const renderDeleteModal: Function = (status: string, id: number): React.ReactElement | null => {
      let component = null;

      if (status === "unpaid" || status === "owed")
      {
        component = <DeleteModal  invoiceId={id}/>
      }

      return component;
    }

    return (
        <GeneralBox>
          <TableContainer>
            <Table fontSize="sm" variant="striped">
              <Thead>
                <Tr>
                  <Th position="sticky" left={0} bgColor={"white"}>Invoice #</Th>
                  <Th>Date Due</Th>
                  <Th>Date Sent</Th>
                  <Th>Amount</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  invoices && invoices.map(
                    (
                      { 
                        id,
                        number,
                        dateDue,
                        dateIssued,
                        amount,
                        discount,
                        status,
                      }
                    ) => (
                      <Tr key={id}>
                        <Td 
                          position="sticky" 
                          left={0} 
                          color={calculateTextColor(status)}
                          bgColor={"white"}
                        >
                          {number}
                        </Td>

                        <Td color={calculateTextColor(status)}>{displayDate(dateDue)}</Td>

                        <Td color={calculateTextColor(status)}>{displayDate(dateIssued)}</Td>

                        <Td color={calculateTextColor(status, discount)}>
                          {displayAmount(amount)}
                        </Td>

                        <Td>
                          {renderDeleteModal(status, id)}
                        </Td>
                      </Tr>
                    )
                  )
                }
              </Tbody>
            </Table>
          </TableContainer>
        </GeneralBox>
    );
}

export default InvoiceTable;