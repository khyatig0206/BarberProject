import React from 'react';
import Header from '../components/Header';
const MyPayments = () => {
  return (
    <div className="bg-cream min-h-screen py-8 px-4">
          {/* <Header /> */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-coffee mb-6">My Payments</h1>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-brown mb-4">Payment History</h2>
          {/* Example Payment History */}
          <ul className="space-y-4">
            <li className="bg-cream p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-coffee">Payment for Consultation</span>
                <span className="text-brown">$100</span>
              </div>
            </li>
            <li className="bg-cream p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-coffee">Payment for Follow-up</span>
                <span className="text-brown">$50</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyPayments;
