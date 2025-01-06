import React, { useState, useEffect } from "react";

const AppointmentsTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/appointments/allbookings`
      );
      const data = await response.json();
      // Ensure 'data' is an array before setting
      setAppointments(Array.isArray(data) ? data : data.appointments || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAppointments([]); // Set to an empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (appointmentId, action) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/appointments/${action}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: appointmentId }),
        }
      );
      if (response.ok) {
        await fetchAppointments(); // Refresh appointments after action
      } else {
        console.error("Failed to update appointment status");
      }
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <table className="min-w-full bg-cream shadow-md rounded">
      <thead>
        <tr className="bg-gray-200 text-gray-700">
          <th className="py-3 px-4 text-left">#</th>
          <th className="py-3 px-4 text-left">Customer Name</th>
          <th className="py-3 px-4 text-left">Email</th>
          <th className="py-3 px-4 text-left">Date</th>
          <th className="py-3 px-4 text-left">Status</th>
          <th className="py-3 px-4 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment, index) => (
          <tr key={appointment.id} className="border-b hover:bg-gray-100">
            <td className="py-3 px-4">{index + 1}</td>
            <td className="py-3 px-4">{appointment.patientName}</td>
            <td className="py-3 px-4">{appointment.patientEmail}</td>
            <td className="py-3 px-4">{appointment.appointmentDate}</td>
            <td className="py-3 px-4">{appointment.status}</td>
            <td className="py-3 px-4 space-x-2">
              <button
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={() => handleAction(appointment.id, "confirm")}
              >
                Confirm
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleAction(appointment.id, "reject")}
              >
                Reject
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AppointmentsTable;
