import React from 'react';

const ContactUs = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col lg:flex-row relative lg:space-x-4 "
    id='contact'>
      {/* Left Section */}
      <div className="w-full lg:w-3/4 flex flex-col items-center lg:items-center justify-center">
        <h1 className="text-4xl font-bold text-brown text-center lg:text-left">Contact Us</h1>
        <p className="text-coffee mb-8 text-center lg:text-left">
          Feel free to contact us any time. We will get back to you as soon as we can!
        </p>
        <form className="flex flex-col space-y-4 w-full max-w-md">
          <input
            type="text"
            placeholder="Name"
            className="border border-coffee p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-brown"
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-coffee p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-brown"
          />
          <textarea
            placeholder="Message"
            rows="5"
            className="border border-coffee p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-brown"
          ></textarea>
          <button
            type="submit"
            className="bg-brown text-cream py-3 rounded-md hover:bg-coffee transition"
          >
            SEND
          </button>
        </form>
      </div>

      {/* Info Section */}
      <div className="bg-cream text-cream p-8 m-2 w-full lg:w-1/4 flex flex-col justify-between lg:static absolute bottom-0 ">
        <div className="absolute -top-4 right-8 bg-brown w-16 h-8 hidden lg:block"></div>
        <div className="space-y-4 mt-8 text-cream p-6 bg-brown mx-auto lg:mx-0 lg:-translate-x-20">
          <h2 className="text-2xl font-bold mb-6">Info</h2>
          <div className="flex items-center space-x-4">
            <span className="material-icons">email</span>
            <p>info@getintouch.we</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="material-icons">phone</span>
            <p>+24 56 89 146</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="material-icons">location_on</span>
            <p>14 Greenroad St.</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="material-icons">schedule</span>
            <p>09:00 - 18:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
