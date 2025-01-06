import React from 'react';
import Header from '../components/Header';
const MyAppointments = () => {
  return (
    <div className="bg-cream min-h-screen py-8 px-4">
          {/* <Header /> */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-coffee mb-6">My Appointments</h1>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-brown mb-4">Upcoming Appointments</h2>
          {/* Example Appointment List */}
          <ul className="space-y-4">
            <li className="bg-cream p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-coffee">Appointment with Dr. Smith</span>
                <span className="text-brown">January 20, 2025</span>
              </div>
            </li>
            <li className="bg-cream p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-coffee">Appointment with Dr. Jones</span>
                <span className="text-brown">January 25, 2025</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
