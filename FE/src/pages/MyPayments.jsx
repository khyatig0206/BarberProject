import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const MyPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      const token = sessionStorage.getItem('accessToken');

      if (!token) {
        toast.error('Access token is missing. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/pay/my-payments`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setPayments(response.data.payments);
      } catch (err) {
        console.error('Error fetching payments:', err);
        toast.error('Unable to fetch payments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brown"></div>
      </div>
    );
  }


  return (
    <>
      <Header />
      <div className="bg-cream min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-coffee mb-6">My Payments</h1>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-brown mb-4">Payment History</h2>
            <ul className="space-y-4">
              {payments.map((payment) => (
                <li key={payment.id} className="bg-cream p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-coffee">
                      Payment for Appointment ID: {payment.appointment_id} on{' '}
                      {new Date(payment.Appointment?.appointment_date).toLocaleString('en-US')}
                    </span>
                    <span className="text-brown">${payment.amount}</span>
                  </div>
                  <div className="text-gray-500 text-sm">
                    Status: {payment.payment_status} | Method: {payment.payment_method || 'N/A'}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPayments;
