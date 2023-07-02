/* eslint-disable @typescript-eslint/naming-convention */
import { type GetUser, type UserData } from "./users";

export const transformUserData = (
  userData: GetUser.UserData_Server
): UserData => {
  const {
    id,
    first_name,
    last_name,
    phone_number,
    email,
    password,
    role,
    customer_id,
    active_vehicle_id,
  } = userData;

  return {
    id,
    firstName: first_name,
    lastName: last_name,
    phoneNumber: phone_number,
    email,
    password,
    role,
    customerId: customer_id,
    activeVehicleId: active_vehicle_id,
  };
};
