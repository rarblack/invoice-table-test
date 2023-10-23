function convertCentsToDollar(amount: number): number {
    return amount / 100;
}

function convertDateFormat(date: string): string {
    return new Date(date).toLocaleDateString("en-GB").replaceAll("/", "-");
  }

export {
    convertCentsToDollar,
    convertDateFormat
};