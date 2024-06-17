import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ManageSpots.css';
import SpotTile from '../SpotTile/SpotTile';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';

const ManageSpots = () => {
  const [spots, setSpots] = useState([]);
  const [user, setUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [spotToDelete, setSpotToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedIn'));
    if (!loggedInUser) {
      navigate('/');
    } else {
      setUser(loggedInUser);
      // Fetch spots created by the user from backend API
      fetch(`/api/users/${loggedInUser.id}/spots`)
        .then(response => response.json())
        .then(data => setSpots(data))
        .catch(error => console.error('Error fetching user spots:', error));
    }
  }, [navigate]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/spots/${spotToDelete}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setSpots(spots.filter(spot => spot.id !== spotToDelete));
        setShowDeleteModal(false);
        setSpotToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting spot:', error);
    }
  };

  const openDeleteModal = (spotId) => {
    setSpotToDelete(spotId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSpotToDelete(null);
    setShowDeleteModal(false);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="manage-spots">
      <h1>Manage Spots</h1>
      {spots.length === 0 ? (
        <div>
          <p>No spots have been posted yet.</p>
          <Link to="/spots/new">Create a New Spot</Link>
        </div>
      ) : (
        <div className="spots-container">
          {spots.map(spot => (
            <div key={spot.id} className="spot-tile">
              <SpotTile spot={spot} />
              <div className="manage-buttons">
                <Link to={`/spots/${spot.id}/edit`} className="update-button">Update</Link>
                <button onClick={() => openDeleteModal(spot.id)} className="delete-button">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showDeleteModal && <DeleteConfirmationModal onClose={closeDeleteModal} onDelete={handleDelete} />}
    </div>
  );
};

export default ManageSpots;
