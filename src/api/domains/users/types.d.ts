import { type Camelize } from "../types";

export declare namespace Login {
  type Payload = {
    phoneNumber: string;
    password: string;
  };

  type Response_Server = GetUser.Response_Server;

  type Response = GetUser.Response;
}

export type UserData = Camelize<GetUser.UserData_Server>;

export declare namespace GetUser {
  type UserData_Server = {
    id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    password: string;
    role: "admin" | null;
    customer_id: string;
    active_vehicle_id: string | null;
  };

  type Response_Server = {
    userData: UserData_Server;
  };

  type Response = {
    userData: UserData;
  };
}
