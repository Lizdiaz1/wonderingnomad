import { useState, useEffect } from 'react';
//import SpotTile from '../SpotTile/SpotTile';
import './LandingPage.css';

const LandingPage = () => {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    // Fetch spots from the backend API
    fetch('/api/spots')
      .then(response => response.json())
      .then(data => {
        // Ensure data is an array before setting it
        if (Array.isArray(data)) {
          setSpots(data);
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
              <img src={spot.thumbnail} alt={`${spot.city}, ${spot.state}`} />
              <p>{spot.city}, {spot.state}</p>
              <p>{spot.rating ? spot.rating : 'New'}</p>
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
