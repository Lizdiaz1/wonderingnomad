import { useState, useEffect } from 'react';
//import SpotTile from '../SpotTile/SpotTile';
import './LandingPage.css';

const LandingPage = () => {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    fetch('/api/spots')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.Spots)) {
          setSpots(data.Spots);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      })
      .catch(error => console.error('Error fetching spots:', error));
  }, []);

  return (
    <div>
      <h1>Landing Page</h1>
      <div>
        {spots.length > 0 ? (
          spots.map((spot, index) => (
            <div key={index}>
              <img src={spot.previewImage} alt={`${spot.city}, ${spot.state}`} />
              <p>{spot.city}, {spot.state}</p>
              <p>{spot.avgRating ? spot.avgRating : 'New'}</p>
              <p>${spot.price}/night</p>
            </div>
          ))
        ) : (
          <p>No spots available</p>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
