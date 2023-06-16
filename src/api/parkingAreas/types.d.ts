type ParkingArea = Omit<
  GetCustomerParkingAreas.ParkingArea_Server,
  "street_address"
> & {
  streetAddress: string;
};

export declare namespace GetCustomerParkingAreas {
  type Params = {
    customerId: string;
  };

  type ParkingArea_Server = {
    id: string;
    name: string;
    street_address: string;
    city: string;
  };

  type Response_Server = {
    parkingAreas: ParkingArea_Server[];
  };

  type Response = {
    parkingAreas: ParkingArea[];
  };
}
