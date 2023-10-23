import { CustomerServerResponse } from "@/interfaces/server/customer";


async function getSingleCustomerFromApi (userId: string): Promise<CustomerServerResponse> {
    const url = `/api/customers/${userId}`;


    const response = await fetch(
     url,
      {
        method: "GET"
      }
    )

    const { data } = await response.json();
    const status = response.status;

    return {
      data,
      status
  }
}

export {
  getSingleCustomerFromApi
}

  
