"use-client"

import CommonContext from "@/contexts/common"
import { displayAmount } from "@/helpers/client/invoice";
import { Box, Flex, Table, Tbody, Td, Tr } from "@chakra-ui/react";
import { useContext } from "react"

function InvoiceStatisticsTable() {
    const {
        statistics
    } = useContext(CommonContext);

    return (
        <Flex justify={"end"}>
            <Box 
            width={"50%"}
            border="1px solid"
            borderColor="gray.100"
            borderRadius={5}
            bg="white"
            p={3}
            mb={5}
            >
            <Table fontSize="sm" variant='striped'>
                <Tbody>
                <Tr>
                    <Td><strong>Discount:</strong></Td>
                    <Td textAlign="right">{displayAmount(statistics.totalDiscountedAmount)}</Td>
                </Tr>

                <Tr>
                    <Td><strong>Invoice Total:</strong></Td>
                    <Td textAlign="right">{displayAmount(statistics.totalAmount)}</Td>
                </Tr>

                <Tr>
                    <Td><strong>Total Paid:</strong></Td>
                    <Td textAlign="right">{displayAmount(statistics.totalPaidAmount)}</Td>
                </Tr>

                <Tr>
                    <Td border="none"><strong>Total Owed:</strong></Td>
                    <Td border="none" textAlign="right">{displayAmount(statistics.totalOwedAmount)}</Td>
                </Tr>

                </Tbody>
            </Table>
            </Box>
        </Flex>
    );
}

export default InvoiceStatisticsTable;