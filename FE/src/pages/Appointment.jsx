import React, { useState } from 'react';
import axios from 'axios';

const AppointmentModal = ({ show, onClose }) => {
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!appointmentDate || !appointmentTime) {
      setError('Please select both date and time');
      return;
    }

    const appointmentDateTime = `${appointmentDate}T${appointmentTime}`;

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/appointments/book`, // Replace with your API URL
        { appointment_date: appointmentDateTime },
        {
          headers: {
            Authorization: `${sessionStorage.getItem('accessToken')}`, // Pass JWT token if required
            'Content-Type': 'application/json',
          },
        }
      );

      setSuccess(response.data.message);
      setAppointmentDate('');
      setAppointmentTime('');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Book Appointment</h2>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
              {success}
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700"
            >
              Time
            </label>
            <input
              type="time"
              id="time"
              className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Booking...' : 'Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
