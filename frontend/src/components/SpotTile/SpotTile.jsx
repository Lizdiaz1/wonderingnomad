//import React from 'react';
import { Link } from 'react-router-dom';
import './SpotTile.css';

const SpotTile = ({ spot }) => {
  const { id, image, city, state, name, rating, price } = spot;

  return (
    <Link to={`/spots/${id}`} className="spot-tile" title={name}>
      <img src={image} alt={`${name}`} className="spot-image" />
      <div className="spot-info">
        <div className="spot-location">
          {city}, {state}
          <div className="spot-rating">
            <i className="fas fa-star"></i> {rating === 'New' ? 'New' : rating.toFixed(1)}
          </div>
        </div>
        <div className="spot-price">
          ${price} / night
        </div>
      </div>
    </Link>
  );
};

export default SpotTile;
