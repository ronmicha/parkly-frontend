import { useGetCustomerParkingAreas, useGetUser } from "../../api/domains";
import { CustomerParkingArea } from "../../components";

export const ParkingListPage = () => {
  const { data: getUserResponse } = useGetUser();

  const { data: getParkingAreasResponse } = useGetCustomerParkingAreas(
    { customerId: getUserResponse?.userData.customerId ?? "" },
    { enabled: Boolean(getUserResponse) }
  );

  return (
    <>
      {(getParkingAreasResponse?.parkingAreas ?? []).map((area) => (
        <CustomerParkingArea
          key={area.id}
          parkingAreaId={area.id}
          name={area.name}
          streetAddress={area.streetAddress}
          city={area.city}
        />
      ))}
    </>
  );
};
