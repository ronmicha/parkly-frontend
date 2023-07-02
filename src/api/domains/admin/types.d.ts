import { type GetUser, type UserData } from "../users";

export type CreateUserPayload = Omit<UserData, "id"> & {
  vehicleIds: string[];
};

export declare namespace GetCustomerUsers {
  type Response_Server = {
    users: GetUser.UserData_Server[];
  };

  type Response = {
    users: UserData[];
  };
}
