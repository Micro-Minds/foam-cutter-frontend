import React, { useState } from 'react';
import axios from 'axios';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const [showShapeOptions, setShowShapeOptions] = useState(false);
  const [selectedShape, setSelectedShape] = useState('');
  const [radius, setRadius] = useState('');

  const handleShapeSelection = (shape: string) => {
    setSelectedShape(shape);
    setShowShapeOptions(false);
  };

  const handleSubmit = async () => {
    if (selectedShape === 'circle' && radius) {
      try {
        await axios.post('http://localhost:5000/api/shapes', {
          shape: selectedShape,
          radius: parseFloat(radius),
        });
        alert('Shape submitted successfully!');
      } catch (error) {
        console.error('Error submitting shape:', error);
        alert('Failed to submit shape.');
      }
    }
  };

  return (
    <div className="homepage-container">
      <div className="left-section">
        <img
          src="https://via.placeholder.com/400x300"
          alt="Design Illustration"
          className="design-image"
        />
      </div>
      <div className="right-section">
        <h1>Viewer Design Portal</h1>
        <p>
          Welcome to the Viewer Design Portal. Upload your images or select a shape to start designing.
        </p>
        <div className="button-group">
          <button className="primary-button">Upload Image</button>
          <button className="secondary-button" onClick={() => setShowShapeOptions(!showShapeOptions)}>
            Select Shape
          </button>
        </div>
        {showShapeOptions && (
          <div className="shape-options">
            <button onClick={() => handleShapeSelection('circle')}>Circle</button>
            <button onClick={() => handleShapeSelection('square')}>Square</button>
            <button onClick={() => handleShapeSelection('triangle')}>Triangle</button>
          </div>
        )}
        {selectedShape === 'circle' && (
          <div className="shape-input">
            <label>
              Enter Radius:
              <input
                type="number"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                placeholder="Radius in cm"
              />
            </label>
            <button onClick={handleSubmit} disabled={!radius}>
              Submit
            </button>
          </div>
        )}
        <footer className="footer">
          &copy; {new Date().getFullYear()} Viewer Design Portal. All rights reserved.
        </footer>
      </div>
    </div>
  );
};
