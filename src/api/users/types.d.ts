type UserData = Pick<GetUser.UserData_Server, "id"> & {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  customerId: string;
  vehicleId: string;
};

export declare namespace GetUser {
  type UserData_Server = {
    id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
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
