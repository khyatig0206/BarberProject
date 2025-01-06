import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AllNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/appointments/notifications`);
        setNotifications(response.data);
      } catch (error) {
        toast.error('Failed to fetch notifications');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotifications();
  }, []);

  return (
    <div className="bg-cream min-h-screen py-8 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="container mx-auto">

        {loading ? (
          <div className="text-center text-coffee">Loading...</div>
        ) : (
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <div className="text-center text-coffee">No notifications available.</div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="bg-brown text-cream p-4 rounded-lg shadow-md hover:bg-coffee transition duration-300"
                >
                  <div className=" justify-between items-center mb-2">
                  <span className="text-xs  text-cream">{new Date(notification.createdAt).toLocaleString()}</span>
                    <h3 className="text-lg font-semibold">{notification.message}</h3>
                   
                  </div>
                  <div className="text-cream text-sm">{notification.status}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllNotification;
