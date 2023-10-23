import { InvoiceStatistics } from "@/interfaces/client/invoice";
import { InvoiceExtended } from "@/interfaces/server/invoice";
import { convertCentsToDollar, convertDateFormat } from "../common";

function calculatePaidAmount(status: string, amount: number): number {
    if (status === "paid")
    {
        return amount;
    }

    return 0;
}

function calculateOwedAmount(status: string, amount: number): number {
    if (status === "unpaid" || status === "owed")
    {
        return amount;
    }

    return 0;
}


function generateStatistics(dataset: InvoiceExtended[]): InvoiceStatistics {
    let totalAmount = 0;
    let totalPaidAmount = 0;
    let totalDiscountedAmount = 0;
    let totalOwedAmount = 0;

    for (const index in dataset)
    {
        const { status, amount, discount } = dataset[index];

        totalAmount += amount;
        totalDiscountedAmount += discount ? discount : 0;

        totalPaidAmount += calculatePaidAmount(status, amount);
        totalOwedAmount += calculateOwedAmount(status, amount);

    }

    return {
        totalAmount,
        totalPaidAmount,
        totalDiscountedAmount,
        totalOwedAmount,
    }
}

function generateUSDCurrencyFormatter(): Intl.NumberFormat {
    return new Intl.NumberFormat(
        "en-US", 
        {
            style: "currency",
            currency: "USD",
        }
    );
}

const USD: Intl.NumberFormat = generateUSDCurrencyFormatter();

function displayAmount(amount: number): string {
    const amountConverted = convertCentsToDollar(amount);
    const amountFormatted = USD.format(amountConverted);

    return amountFormatted;
}

function displayDate(date: string): string {
    const dateConverted = convertDateFormat(date);

    return dateConverted;
}

export { 
    generateStatistics,
    displayAmount,
    displayDate
}