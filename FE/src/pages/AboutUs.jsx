import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-cream text-brown">
      {/* Header Section */}
      <section className="text-center py-12 px-4">
        <h1 className="text-4xl font-bold mb-4">About us</h1>
        <p className="text-lg max-w-xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </p>
      </section>

      {/* Images Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-16 mb-12">
        <img
          src="https://via.placeholder.com/300"
          alt="Image 1"
          className="rounded-lg shadow-lg"
        />
        <img
          src="https://via.placeholder.com/300"
          alt="Image 2"
          className="rounded-lg shadow-lg"
        />
        <img
          src="https://via.placeholder.com/300"
          alt="Image 3"
          className="rounded-lg shadow-lg"
        />
        <img
          src="https://via.placeholder.com/300"
          alt="Image 4"
          className="rounded-lg shadow-lg"
        />
      </section>

      {/* Content Section */}
      <section className="px-4 md:px-16 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              We make sure your idea & creation delivered properly
            </h2>
            <p className="text-base mb-4">
              Pellentesque mollis urna vel semper egestas. Duis a erat dictum
              lacus. Sed sagittis non nunc ac malesuada. Etiam nec porttitor
              erat, vel ullamcorper erat. Fusce euismod ipsum eget nunc
              pulvinar feugiat.
            </p>
            <p className="text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">
            Sed do eiusmod tempor incididun
            </h2>
            <p className="text-base mb-4">
              Sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <blockquote className="text-base italic border-l-4 border-coffee pl-4">
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.”
            </blockquote>
          </div>
        </div>
      </section>


      {/* Services Section */}
      <section className="text-center py-12 bg-white">
        <h2 className="text-2xl font-semibold mb-6">
          We help businesses to grow faster and bigger
        </h2>
        <p className="text-base max-w-2xl mx-auto mb-12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-16">
          <div className="bg-coffee text-cream p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-2">Professional Team</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus.
            </p>
          </div>
          <div className="bg-coffee text-cream p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-2">Target Oriented</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus.
            </p>
          </div>
          <div className="bg-coffee text-cream p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-2">Success Guarantee</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
