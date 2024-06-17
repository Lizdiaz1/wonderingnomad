import React, { useState, useEffect } from 'react';
import SpotTile from '../SpotTile/SpotTile';
import './LandingPage.css';

const LandingPage = () => {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    // Fetch spots from backend API
    fetch('/api/spots')
      .then(response => response.json())
      .then(data => setSpots(data))
      .catch(error => console.error('Error fetching spots:', error));
  }, []);

  return (
    <div className="landing-page">
      <h1>Explore Our Spots</h1>
      <div className="spots-container">
        {spots.map(spot => (
          <SpotTile key={spot.id} spot={spot} />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
