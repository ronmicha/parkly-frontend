import { useState } from "react";
import { ParkingSlotManagement, UserManagement } from "../../components/Admin";

type View = "users" | "slots";

export const AdminPage = () => {
  const [currentView, setCurrentView] = useState<View>("users");

  return (
    <>
      <button
        onClick={() => {
          setCurrentView("users");
        }}
      >
        Users
      </button>
      <button
        onClick={() => {
          setCurrentView("slots");
        }}
      >
        Slots
      </button>
      {currentView === "users" && <UserManagement />}
      {currentView === "slots" && <ParkingSlotManagement />}
    </>
  );
};
