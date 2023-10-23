import { Customer } from "@/interfaces/database/customer";


async function getSingleCustomerFromApi (userId: string): Promise<Customer> {
    const url = `/api/customers/${userId}`;


    const response = await fetch(
     url,
      {
        method: "GET"
      }
    )

    const { data } = await response.json();

    return data;
  }

export {
    getSingleCustomerFromApi
}

  
