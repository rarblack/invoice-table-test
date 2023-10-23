interface Invoice {
    id: string;
    number: number;
    dateIssued: string;
    dateDue: string;
    settled: boolean;
    recipient: string;
    patron: string;
    items: LineItem[];
    discount?: number;
}

interface LineItem {
    title: string;
    description: string;
    price: number;
    quantity: number;
}

export type { 
    Invoice, 
    LineItem 
};