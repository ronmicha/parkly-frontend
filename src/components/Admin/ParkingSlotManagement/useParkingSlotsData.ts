import {
  useGetCustomerParkingAreas,
  useGetParkingSlots,
  useGetProfile,
} from "../../../api/domains";

export type TableRow = {
  id: string;
  number: string;
  floor: string;
  type: string;
  isNew?: boolean;
};

export const useParkingSlotsData = () => {
  const { data: getProfileResponse, isLoading: getProfileLoading } =
    useGetProfile();

  const customerId = getProfileResponse?.userData.customerId;

  const { data: getParkingAreasResponse, isLoading: getParkingAreasLoading } =
    useGetCustomerParkingAreas(
      { customerId: customerId ?? "" },
      { enabled: Boolean(getProfileResponse) }
    );

  const parkingAreaId = getParkingAreasResponse?.parkingAreas[0].id;

  const { data: getParkingSlotsResponse, isLoading: getParkingSlotsLoading } =
    useGetParkingSlots(
      { parkingAreaId: parkingAreaId ?? "" },
      { enabled: Boolean(getParkingAreasResponse) }
    );

  const isLoading =
    getProfileLoading || getParkingAreasLoading || getParkingSlotsLoading;

  return {
    parkingSlots: getParkingSlotsResponse?.parkingSlots,
    createSlot: () => {},
    updateSlot: () => {},
    deleteSlots: () => {},
    isLoading,
  };
};
