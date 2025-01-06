import React, { useState } from "react";
import AppointmentsTable from "../components/Allappointments";
import AllUsers from "../components/Allusers";

const AdminAppointmentsPage = () => {
  const [activeView, setActiveView] = useState("appointments");

  const renderView = () => {
    switch (activeView) {
      case "appointments":
        return <AppointmentsTable />;

      case "users":
        return <AllUsers />;

      case "notifications":
        return <p>Notifications List (to be implemented)</p>;

      default:
        return <p>Select an option from the menu.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-coffee text-cream py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="text-lg font-bold">Admin Dashboard</div>
          <div className="space-x-4">
            <button
              className={`bg-brown px-4 py-2 rounded ${
                activeView === "appointments" ? "bg-blue-800" : ""
              }`}
              onClick={() => setActiveView("appointments")}
            >
              All Appointments
            </button>
            <button
              className={`bg-brown px-4 py-2 rounded ${
                activeView === "users" ? "bg-blue-800" : ""
              }`}
              onClick={() => setActiveView("users")}
            >
              All Users
            </button>
            <button
              className={`bg-brown px-4 py-2 rounded ${
                activeView === "notifications" ? "bg-blue-800" : ""
              }`}
              onClick={() => setActiveView("notifications")}
            >
              Notifications
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-2xl font-semibold mb-6">
          {activeView === "appointments"
            ? "All Appointments"
            : activeView === "users"
            ? "All Users"
            : "Notifications"}
        </h1>
        {renderView()}
      </div>
    </div>
  );
};

export default AdminAppointmentsPage;
