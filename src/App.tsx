import { useGetCustomerParkingAreas, useGetUser } from "./api";
import { CustomerParkingArea } from "./components";

function App() {
  const { data: getUserResponse } = useGetUser({});

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
}

export default App;
