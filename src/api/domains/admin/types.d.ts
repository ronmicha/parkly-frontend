import { type GetUser } from "../users";
import { type Camelize } from "../types";

export declare namespace CreateUser {
  type Payload = Omit<GetCustomerUsers.CustomerUser, "id">;

  type Response_Server = GetUser.Response_Server;

  type Response = GetUser.Response;
}

export declare namespace UpdateUser {
  type Payload = Partial<GetCustomerUsers.CustomerUser>;

  type Response_Server = GetUser.Response_Server;

  type Response = GetUser.Response;
}

export declare namespace GetCustomerUsers {
  type Params = {
    customerId: string;
  };

  type CustomerUser_Server = Pick<
    GetUser.UserData_Server,
    | "id"
    | "first_name"
    | "last_name"
    | "phone_number"
    | "email"
    | "role"
    | "customer_id"
  > & { vehicle_ids: string[] | null };

  type CustomerUser = Camelize<CustomerUser_Server>;

  type Response_Server = {
    users: CustomerUser_Server[];
  };

  type Response = {
    users: CustomerUser[];
  };
}
