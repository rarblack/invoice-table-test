import { Customer } from "../database/customer"
import { InvoiceExtended } from "../server/invoice"

interface InvoiceStatistics {
    totalAmount: number,
    totalPaidAmount: number,
    totalDiscountedAmount: number,
    totalOwedAmount: number,
}

interface ContextShareValues {
    userId: string,
    customer: Customer,
    invoices: InvoiceExtended[],
    statistics: InvoiceStatistics,
    stableInit: Function,
    deleteInvoice: Function
}

export type {
    InvoiceStatistics,
    ContextShareValues
}