import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewModal from '../ReviewModal/ReviewModal';
import './SpotDetail.css';

const SpotDetail = () => {
  const { id } = useParams();
  const [spot, setSpot] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Fetch spot details from backend API
    fetch(`/api/spots/${id}`)
      .then(response => response.json())
      .then(data => setSpot(data))
      .catch(error => console.error('Error fetching spot details:', error));

    // Fetch reviews for the spot
    fetch(`/api/spots/${id}/reviews`)
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error('Error fetching reviews:', error));

    // Fetch user data to check if logged in
    const loggedInUser = JSON.parse(localStorage.getItem('loggedIn'));
    if (loggedInUser) {
      setUser(loggedInUser);
      setLoggedIn(true);
    }
  }, [id]);

  const handleOpenReviewModal = () => {
    setReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setReviewModalOpen(false);
  };

  const handleReviewSubmit = (newReview) => {
    setReviews([newReview, ...reviews]);
    setReviewModalOpen(false);
  };

  if (!spot) return <div>Loading...</div>;

  const userHasReviewed = reviews.some(review => review.userId === user?.id);
  const isOwner = spot.ownerId === user?.id;

  const averageRating = reviews.length === 0 ? 'New' : (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="spot-detail">
      <h1>{spot.name}</h1>
      <p className="location">
        Location: {spot.city}, {spot.state}, {spot.country}
      </p>
      <div className="images">
        <div className="large-image">
          <img src={spot.images[0]} alt={`${spot.name} large`} />
        </div>
        <div className="small-images">
          {spot.images.slice(1, 5).map((image, index) => (
            <img key={index} src={image} alt={`${spot.name} ${index + 1}`} />
          ))}
        </div>
      </div>
      <div className="info-and-callout">
        <div className="spot-info">
          <h2>Hosted by {spot.hostFirstName} {spot.hostLastName}</h2>
          <p>{spot.description}</p>
          <div className="review-summary">
            <i className="fas fa-star"></i> {averageRating}
            {reviews.length > 0 && <span> · {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}</span>}
          </div>
        </div>
        <div className="callout-box">
          <div className="price">
            ${spot.price} / night
          </div>
          <button className="reserve-button" onClick={() => alert('Feature coming soon')}>
            Reserve
          </button>
          <div className="review-summary">
            <i className="fas fa-star"></i> {averageRating}
            {reviews.length > 0 && <span> · {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}</span>}
          </div>
        </div>
      </div>
      <div className="reviews-section">
        <h2>Reviews</h2>
        {isLoggedIn && !isOwner && !userHasReviewed && (
          <button onClick={handleOpenReviewModal} className="post-review-button">Post Your Review</button>
        )}
        {reviews.length === 0 ? (
          <p>Be the first to post a review!</p>
        ) : (
          reviews.sort((a, b) => new Date(b.date) - new Date(a.date)).map(review => (
            <div key={review.id} className="review">
              <p className="review-header">
                <span className="reviewer-name">{review.reviewerFirstName}</span>
                <span className="review-date">{new Date(review.date).toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
              </p>
              <p className="review-text">{review.comment}</p>
            </div>
          ))
        )}
      </div>
      {isReviewModalOpen && <ReviewModal onClose={handleCloseReviewModal} onSubmit={handleReviewSubmit} spotId={spot.id} />}
    </div>
  );
};

export default SpotDetail;
