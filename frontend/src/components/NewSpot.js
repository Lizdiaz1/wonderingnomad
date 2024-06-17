import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewSpot.css';

const NewSpot = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    country: '',
    street: '',
    city: '',
    state: '',
    latitude: '',
    longitude: '',
    description: '',
    title: '',
    price: '',
    previewImage: '',
    images: ['', '', '', ''],
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      images: newImages,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.street) newErrors.street = 'Street Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.description || formData.description.length < 30) newErrors.description = 'Description needs 30 or more characters';
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.price) newErrors.price = 'Price per night is required';
    if (!formData.previewImage) newErrors.previewImage = 'Preview Image URL is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('/api/spots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        navigate(`/spots/${data.id}`);
      } else {
        setErrors({ apiError: data.message });
      }
    } catch (err) {
      setErrors({ apiError: 'An error occurred. Please try again.' });
    }
  };

  const resetForm = () => {
    setFormData({
      country: '',
      street: '',
      city: '',
      state: '',
      latitude: '',
      longitude: '',
      description: '',
      title: '',
      price: '',
      previewImage: '',
      images: ['', '', '', ''],
    });
    setErrors({});
  };

  return (
    <div className="new-spot">
      <h1>Create a New Spot</h1>
      <form onSubmit={handleSubmit}>
        <section>
          <h2>Where's your place located?</h2>
          <p>Guests will only get your exact address once they booked a reservation.</p>
          <label>
            Country
            <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" />
          </label>
          {errors.country && <p className="error">{errors.country}</p>}
          <label>
            Street Address
            <input type="text" name="street" value={formData.street} onChange={handleChange} placeholder="Street Address" />
          </label>
          {errors.street && <p className="error">{errors.street}</p>}
          <label>
            City
            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
          </label>
          {errors.city && <p className="error">{errors.city}</p>}
          <label>
            State
            <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" />
          </label>
          {errors.state && <p className="error">{errors.state}</p>}
          <label>
            Latitude (optional)
            <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} placeholder="Latitude" />
          </label>
          <label>
            Longitude (optional)
            <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} placeholder="Longitude" />
          </label>
        </section>

        <section>
          <h2>Describe your place to guests</h2>
          <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Please write at least 30 characters"
          ></textarea>
          {errors.description && <p className="error">{errors.description}</p>}
        </section>

        <section>
          <h2>Create a title for your spot</h2>
          <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Name of your spot"
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </section>

        <section>
          <h2>Set a base price for your spot</h2>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price per night (USD)"
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </section>

        <section>
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <input
            type="text"
            name="previewImage"
            value={formData.previewImage}
            onChange={handleChange}
            placeholder="Preview Image URL"
          />
          {errors.previewImage && <p className="error">{errors.previewImage}</p>}
          {formData.images.map((image, index) => (
            <input
              key={index}
              type="text"
              value={image}
              onChange={(e) => handleImageChange(index, e.target.value)}
              placeholder={`Image URL ${index + 2}`}
            />
          ))}
        </section>

        {errors.apiError && <p className="error">{errors.apiError}</p>}

        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
};

export default NewSpot;
