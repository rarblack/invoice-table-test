import { faker } from '@faker-js/faker';
import { Company } from '@/interfaces/database/company';
import { Customer } from '@/interfaces/database/customer';
import { Invoice, LineItem } from '@/interfaces/database/invoice';

const createCustomer = () : Customer => {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    address: faker.location.streetAddress(),
    email: faker.internet.email(),
    phone: faker.phone.imei(),
  }
}

const createCompany = () : Company => {
  return {
    id: faker.string.uuid(),
    company: faker.company.name(),
    logo: faker.image.urlLoremFlickr({category: "nature", width: 350, height: 350}),
    address: faker.location.streetAddress(),
    email: faker.internet.email(),
    phone: faker.phone.number()
  }
}

const createLineItem = () : LineItem => {
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.number.int({min: 20, max: 250}),
    quantity: faker.number.int({min: 1, max: 15})
  }
}

const createInvoice = (customer: string, company: string, lineItems: number): Invoice => {
  let items: LineItem[] = [];

  for (let i = 0; i < lineItems; i++) {
    items.push(createLineItem())
  }

  return {
    id: faker.string.uuid(),
    number: faker.number.int({min: 1, max: 100}),
    dateIssued: faker.date.recent(),
    dateDue: faker.date.future(),
    settled: faker.datatype.boolean({probability: .65}),
    recipient: customer,
    patron: company,
    items,
  }
}

export { 
  createCustomer, 
  createCompany, 
  createLineItem, 
  createInvoice 
};
