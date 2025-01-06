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
        setAppointments(Array.isArray(data) ? data : data.appointments || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAppointments([]);
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
  
    if (loading) {
        return (
          <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin-slow border-brown"></div>
          </div>
        );
      }
  
    return (
      <table className="min-w-full bg-cream shadow-md rounded">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-3 px-4 text-left">#</th>
            <th className="py-3 px-4 text-left">Customer Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Appointment Date</th>
            <th className="py-3 px-4 text-left">Created At</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={appointment.id} className="border-b hover:bg-gray-100">
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">{appointment.CustomerName}</td>
              <td className="py-3 px-4">{appointment.CustomerEmail}</td>
              <td className="py-3 px-4">
                {new Date(appointment.appointmentDate).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                })}
                </td>
              <td className="py-3 px-4">
                {new Date(appointment.createdAt).toLocaleString()} {/* Format the timestamp */}
              </td>
              <td className="py-3 px-4">{appointment.status}</td>
              <td className="py-3 px-4 space-x-2">
                <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50 disabled:bg-gray-500"
                    onClick={() => handleAction(appointment.id, "confirm")}
                    disabled={appointment.status !== "pending"}
                >
                    Confirm
                </button>
                <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50 disabled:bg-gray-500"
                    onClick={() => handleAction(appointment.id, "reject")}
                    disabled={appointment.status !== "pending"}
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
