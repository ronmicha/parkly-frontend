import { type GetUser, type UserData } from "../users";
import { type Camelize } from "../types";

export type CreateUserPayload = Omit<UserData, "id"> & {
  vehicleIds: string[];
};

export declare namespace GetCustomerUsers {
  type Params = {
    customerId: string;
  };

  type CustomerUser_Server = Pick<
    GetUser.UserData_Server,
    "id" | "first_name" | "last_name" | "phone_number" | "email" | "role"
  > & { vehicle_ids: string[] };

  type CustomerUser = Camelize<CustomerUser_Server>;

  type Response_Server = {
    users: CustomerUser_Server[];
  };

  type Response = {
    users: CustomerUser[];
  };
}
