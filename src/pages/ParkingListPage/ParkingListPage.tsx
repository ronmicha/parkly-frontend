import { useGetCustomerParkingAreas, useGetProfile } from "../../api/domains";
import { CustomerParkingArea } from "../../components";

export const ParkingListPage = () => {
  const { data: getProfileResponse } = useGetProfile();

  const { data: getParkingAreasResponse } = useGetCustomerParkingAreas(
    { customerId: getProfileResponse?.userData.customerId ?? "" },
    { enabled: Boolean(getProfileResponse) }
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
