import { Customer } from "../database/customer";
import { ServerResponse } from "./common";

interface CustomerServerResponse extends ServerResponse{
    data: Customer;
  }
  
  export type {
    CustomerServerResponse
  };
    