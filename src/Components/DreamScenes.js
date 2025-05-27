import React, { useState } from 'react';
import axios from 'axios';
import './DreamScenes.css';

const axiosInstance = axios.create({
  timeout: 180000, // 2 min
});

const DreamScenes = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      alert("Please enter a valid prompt.");
      return;
    }

    setLoading(true);
    setImageUrl('');

    try {
      const idToken = localStorage.getItem('idToken');
      const localId = localStorage.getItem('localId');

      const config = {
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axiosInstance.post(
        'https://synesthesiya-backend-po7u.onrender.com/generate-image',
        {
          prompt: prompt.trim(),
          user_id: localId,
          cache: true,
          story_id: '12UxqgInW58UJxZ7kBMO'
        },
        config
      );

      if (response?.data?.url) {
        setImageUrl(response.data.url);
      } else {
        console.warn("Image not returned:", response.data);
        alert("Failed to generate image.");
      }
    } catch (err) {
      console.error("Error generating image:", err.response?.data || err.message);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bgds" >
        <div className="container  dream-scenes  ">
          <h1 className="text-center mt-5 mb-4 dss">🌌 Dream Scenes</h1>

          <div className="mb-3">
              {/* <label htmlFor="promptInput" className="form-label">Describe your dream</label> */}
              <input
              type="text"
              id="promptInput"
              className="form-c2"
              placeholder="Describe your dream ~ e.g. A futuristic city in the clouds..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              />
          </div>

          <div className="text-center mb-4">
              <button
              className="btn btn-g"
              onClick={handleGenerateImage}
              disabled={loading || !prompt.trim()}
              >
              {loading ? "Generating..." : "Generate Image"}
              </button>
          </div>

          {imageUrl && (
              <div className="text-center">
                <hr></hr>
              <h2 className='ds'>🖼️ Your Dream Scene</h2>
              <img src={imageUrl} alt="Generated Dream" className="img-fluid rounded mb-3" />
              <br />
              <a href={imageUrl} download="dream-scene.png" className="btn btn-success mt-2 mb-5">
                  ⬇️ Download Image
              </a>
              </div>
          )}
        </div>
    </div>
    
  );
};

export default DreamScenes;
