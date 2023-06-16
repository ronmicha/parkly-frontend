type UserDataWithoutId = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  customerId: string;
  activeVehicleId: string;
};

type CreateUserPayload = Omit<UserDataWithoutId, "customerId"> & {
  vehicleIds: string[];
};

type UserData = Pick<GetUser.UserData_Server, "id"> & UserDataWithoutId;

export declare namespace GetUser {
  type UserData_Server = {
    id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    password: string;
    customer_id: string;
    active_vehicle_id: string;
  };

  export type Response_Server = {
    userData: UserData_Server;
  };

  export type Response = {
    userData: UserData;
  };
}
