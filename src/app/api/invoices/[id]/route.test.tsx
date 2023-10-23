import { getSingleUserInvoicesFromApi } from "@/utils/client/invoice/single-user-data-action";
import { InvoiceServerResponse } from "@/interfaces/server/invoice";

describe("Find Invoice Route", () => {
  describe("GET customer invoices", () => {
    const userId = '5ac51f7e-81b1-49c6-9c39-78b2d171abd6';
    const fakeUserId = 'not-a-valid-id';

    it("should return only user related invoices", 
      async () => 
      {
          const response: InvoiceServerResponse = await getSingleUserInvoicesFromApi(userId);

          const { data, status } = response;
          
          expect(status).toEqual(200);
          expect(data.id).toEqual(userId);
        }
    );

    it("should fail if it cant find a Customer", 
      async () => 
        {
          const response: InvoiceServerResponse = await getSingleUserInvoicesFromApi(userId);

          const { data, status } = response;
          
          expect(status).toEqual(404);
          expect(data).toEqual(undefined);
        }
    );
  })
});