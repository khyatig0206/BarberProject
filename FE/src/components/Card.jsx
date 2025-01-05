// Card.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ icon, title, description }) => {
  return (
    <div className="bg-cream shadow-lg rounded-lg p-6 flex flex-col items-center text-center border border-coffee
    -translate-y-1/2 hover:bg-brown transform transition-transform hover:scale-105 rounded-tr-lg rounded-bl-lg group">
  <div className="text-4xl mb-4 group-hover:text-cream">{icon}</div>
  <h3 className="text-xl font-bold text-coffee mb-2 group-hover:text-cream">{title}</h3>
  <p className="text-coffee group-hover:text-cream">{description}</p>
</div>

  );
};

Card.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Card;

