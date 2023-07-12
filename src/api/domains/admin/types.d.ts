import { type GetUser } from "../users";
import { type Camelize } from "../types";
import { type GetParkingSlots, type ParkingSlot } from "../parkingSlots";

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

// region users

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

export declare namespace DeleteUsers {
  type Payload = { userIds: Array<GetCustomerUsers.CustomerUser["id"]> };

  type Response = unknown;
}

// endregion

// region parking slots

export declare namespace CreateParkingSlot {
  type Payload = Omit<ParkingSlot, "id" | "vehicleId">;

  type Response_Server = { slot: GetParkingSlots.ParkingSlot_Server };

  type Response = { slot: ParkingSlot };
}

export declare namespace UpdateParkingSlot {
  type Payload = Omit<ParkingSlot, "vehicleId">;

  type Response_Server = { slot: GetParkingSlots.ParkingSlot_Server };

  type Response = { slot: ParkingSlot };
}

export declare namespace DeleteParkingSlots {
  type Payload = { slotIds: Array<ParkingSlot["id"]> };

  type Response = unknown;
}

// endregion
