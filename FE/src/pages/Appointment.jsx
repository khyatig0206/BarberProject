import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppointmentModal = ({ show, onClose }) => {
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!appointmentDate || !appointmentTime) {
      toast.error('Please select both date and time!');
      return;
    }
  
    const appointmentDateTime = `${appointmentDate}T${appointmentTime}`;
    const currentDateTime = new Date();
    const selectedDateTime = new Date(appointmentDateTime);
  
    const currentHours = currentDateTime.getHours();
    const currentMinutes = currentDateTime.getMinutes();
    const selectedHours = selectedDateTime.getHours();
    const selectedMinutes = selectedDateTime.getMinutes();
  
    console.log('Current Time:', currentHours, currentMinutes);
    console.log('Selected Time:', selectedHours, selectedMinutes);
  
    // Check if selected date is today and if selected time is in the past
    if (
      selectedDateTime <= currentDateTime || 
      (appointmentDate === currentDateTime.toISOString().split('T')[0] &&
        (selectedHours < currentHours || 
        (selectedHours === currentHours && selectedMinutes < currentMinutes)))
    ) {
      toast.error('You cannot select a past time on today\'s date.');
      return;
    }
  
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/appointments/book`,
        { appointment_date: appointmentDateTime },
        {
          headers: {
            Authorization: `${sessionStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success(response.data.message || 'Appointment booked successfully!');
      setAppointmentDate('');
      setAppointmentTime('');
      onClose(); // Close the modal after a successful booking
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred while booking.');
    } finally {
      setLoading(false);
    }
  };
  
  const validateTime = () => {
    const currentDate = new Date();
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const selectedDate = new Date(appointmentDate);
  
    if (appointmentDate === currentDate.toISOString().split('T')[0] && appointmentTime) {
      const [selectedHours, selectedMinutes] = appointmentTime.split(':').map(Number);
  
      console.log('Current Time:', currentHours, currentMinutes);
      console.log('Selected Time:', selectedHours, selectedMinutes);
  
      if (
        selectedHours < currentHours ||
        (selectedHours === currentHours && selectedMinutes < currentMinutes)
      ) {
        toast.error("You cannot select a past time on today's date.");
        setAppointmentTime('');
      }
    }
  };
  

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-brown bg-opacity-50 z-50">
      <div className="bg-cream m-2 w-full max-w-md p-6 rounded-lg shadow-lg sm:p-4 md:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-coffee sm:text-lg md:text-xl lg:text-2xl">
            Book Appointment
          </h2>
          <button
            className="text-coffee hover:text-brown"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-coffee"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              className="mt-1 w-full p-2 border border-coffee rounded focus:outline-none focus:ring focus:ring-brown"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="time"
              className="block text-sm font-medium text-coffee"
            >
              Time
            </label>
            <input
              type="time"
              id="time"
              className="mt-1 w-full p-2 border border-coffee rounded focus:outline-none focus:ring focus:ring-brown"
              value={appointmentTime}
              onChange={(e) => {
                setAppointmentTime(e.target.value);
                // validateTime();
              }}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-coffee text-cream px-4 py-2 rounded hover:bg-brown disabled:opacity-50 sm:px-3 sm:py-1 md:px-4 md:py-2 lg:px-5 lg:py-2"
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
