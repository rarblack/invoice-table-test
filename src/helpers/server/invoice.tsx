import { 
    InvoiceExtended, 
    InvoiceTimestamps, 
    SortParams
} from "@/interfaces/server/invoice";
import { Invoice, LineItem } from "@/interfaces/database/invoice";
import { convertCentsToDollar } from "../common";
import { extractParamsFromUrl } from "./common";
  
function isInvoicePaid(isPaymentSettled: boolean): boolean 
{
    return isPaymentSettled;
}

function convertDateToNumericRepresentation(date: string): number {
    return Date.parse(date);
}

function isInvoiceOwed(timestamps: InvoiceTimestamps): boolean 
{
    const { dateIssued, dateDue } = timestamps;

    const dateIssuedAsNumber = convertDateToNumericRepresentation(dateIssued);
    const dateDueAsNumber = convertDateToNumericRepresentation(dateDue);

    return dateIssuedAsNumber >= dateDueAsNumber;
}

function calculateInvoiceStatus(
    isPaymentSettled: boolean, 
    timestamps: InvoiceTimestamps
): string
{
    if (isInvoicePaid(isPaymentSettled)) 
    {
        return "paid";
    } 

    else if (isInvoiceOwed(timestamps))
    {
        return "owed";
    }

    return "unpaid"
}
  
function calculateTotalAmount(items: LineItem[]): number{
    let totalAmount = 0;

    for (const index in items) {
        const { price, quantity } = items[index];
        totalAmount += price * quantity;
    }

    return totalAmount;
}

function calculateDiscount(
    status: string, 
    total: number, 
    discountPercent: number = 10
): number {
    let discountAmount = 0;

    if (status === "unpaid" || status === "owe") 
    {  
        if (convertCentsToDollar(total) > 100)
        {
            discountAmount = (total * discountPercent) / 100;
        }
    }

    return discountAmount;
}

function mapNewFieldsAndUpdateExistingValues(dataset: Invoice[]): InvoiceExtended[] {
    return dataset.map(
        (
            {
            dateDue,
            dateIssued,
            settled,
            items,
            ...rest
            }
        ) => {
            const isPaymentSettled = settled;
            const timestamps = {dateIssued, dateDue};

            // possible values: paid, unpaid, owed
            const status = calculateInvoiceStatus(isPaymentSettled, timestamps);

            const amount = calculateTotalAmount(items);

            const discount = calculateDiscount(status, amount);

            return {
            dateDue,
            dateIssued,
            settled,
            items,
            discount,
            ...rest,

            // new fields
            amount,
            status,
            }
        }
    );
}

function filterDatasetByUserId(dataset: Invoice[], id: string): Invoice[] {
    return dataset.filter(
      ({ recipient }) => recipient === id
    );
  }

function getSortParams(request: Request): SortParams {
    const sortBy = extractParamsFromUrl(request).get("sortBy");
    const sortOrder = extractParamsFromUrl(request).get("sortOrder");

    return { 
        sortBy, 
        sortOrder
    };
}

export {
    mapNewFieldsAndUpdateExistingValues,
    filterDatasetByUserId,
    getSortParams
};