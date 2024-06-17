import React, { useState } from 'react';
import './ReviewModal.css';

const ReviewModal = ({ onClose, onSubmit, spotId }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length < 10) {
      setError('Comment needs at least 10 characters');
      return;
    }
    if (rating === 0) {
      setError('Rating is required');
      return;
    }

    try {
      const response = await fetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment, rating }),
      });
      const data = await response.json();

      if (response.ok) {
        onSubmit(data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const resetForm = () => {
    setComment('');
    setRating(0);
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2>How was your stay?</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <textarea
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Leave your review here..."
          ></textarea>
          <label>
            Stars
            <input
              type="number"
              name="rating"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              min="1"
              max="5"
            />
          </label>
          <button type="submit" disabled={comment.length < 10 || rating === 0}>Submit Your Review</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
