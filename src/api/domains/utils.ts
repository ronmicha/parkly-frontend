/* eslint-disable @typescript-eslint/naming-convention */
import { type GetUser, type UserData } from "./users";
import { type GetParkingSlots, type ParkingSlot } from "./parkingSlots";

export const transformUserData = (
  userData: GetUser.UserData_Server
): UserData => ({
  id: userData.id,
  firstName: userData.first_name,
  lastName: userData.last_name,
  phoneNumber: userData.phone_number,
  email: userData.email,
  password: userData.password,
  role: userData.role,
  customerId: userData.customer_id,
  activeVehicleId: userData.active_vehicle_id,
});

export const transformParkingSlot = (
  slot: GetParkingSlots.ParkingSlot_Server
): ParkingSlot => ({
  id: slot.id,
  slotNumber: slot.slot_number,
  slotFloor: slot.slot_floor,
  slotType: slot.slot_type,
  vehicleId: slot.vehicle_id,
});
