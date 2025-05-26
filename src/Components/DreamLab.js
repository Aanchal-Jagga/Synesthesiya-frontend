import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './DreamLab.css';
const axiosInstance = axios.create({
  timeout: 300000, // 3 min
});
const DreamLab = () => {
  const [topic, setTopic] = useState('');
  const [story, setStory] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [voiceUrl, setVoiceUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null); // 



  // Check if the user is authenticated
  useEffect(() => {
    const idToken = localStorage.getItem('idToken');
    if (!idToken) {
      window.location.href = '/login'; // Redirect if not logged in
    }
  }, []);

  useEffect(() => {
    if (voiceUrl && audioRef.current) {
      setTimeout(() => {
        audioRef.current.load();
      }, 50); // slight delay
    }
  }, [voiceUrl]);



  const handleSubmit = async () => {
    if (!topic.trim()) {
      alert('Please enter a valid topic.');
      return;
    }

    setLoading(true);

    try {
      const idToken = localStorage.getItem('idToken');
      const localId = localStorage.getItem('localId');

      if (!idToken || !localId) {
        alert('User authentication failed. Please log in again.');
        window.location.href = '/login'; // Redirect if authentication fails
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      };

      // Log localId for debugging
      console.log('localId:', localId);

      // 1. Generate Story
      const storyRes = await axiosInstance.post(
        'https://9093-49-36-191-40.ngrok-free.app/generate-story',
        { user_id: localId, prompt: topic.trim() },
        config
      );

      const generatedStory = storyRes?.data?.story;

      if (!generatedStory) {
        alert('Failed to generate story.');
        return;
      }

      setStory(generatedStory);

      const saveResponse = await axiosInstance.post('https://9093-49-36-191-40.ngrok-free.app/save-story', {
        text:generatedStory,
        title:"string",
        user_id:localId, // from Firebase auth
      });
      const storyId = saveResponse.data.story_id;
      const scenes = generatedStory.split('.').map(s => s.trim()).filter(Boolean);

      // 2. Generate Image
      const imageRes = await axiosInstance.post(
        'https://9093-49-36-191-40.ngrok-free.app/generate-story-images',
        {
          story_id: storyId,   
          user_id: localId,              
          "num_images": 3
        },
        config
      );
      
      const imageData = imageRes?.data;

      if (
        imageData &&
        Array.isArray(imageData.images) &&
        imageData.images.length > 0
      ) {
        const urls = imageData.images
          .map((img) => img.image_url)
          .filter((url) => typeof url === "string" && url.startsWith("http"));
        setImageUrls(urls);
      } else {
        console.warn("Images not returned properly:", imageData);
        alert("Failed to retrieve generated images.");
        setImageUrls([]);
      }

      // console.log("Generated image URL:", imageRes?.data?.url); 

      // 3. Generate Voice
      const voiceRes = await axiosInstance.post(
        'https://9093-49-36-191-40.ngrok-free.app/generate-voice',
        
        { text: generatedStory,
          voice_id:"en-US-Standard-D",
          user_id: localId, 
          cache: true,                   // Cache option
          story_id: storyId
          
        },
        config
      );

      // if (voiceRes?.data?.url) {
      //   setVoiceUrl(voiceRes.data.url);
      // } else {
      //   console.warn('Voice not returned properly:', voiceRes.data);
      //   alert('Failed to generate voice narration.');
      // }
      const voiceData = voiceRes?.data; // 🔄 changed

      if (voiceData && voiceData.url && voiceData.url.startsWith('http')) { // 🔄 changed
        setVoiceUrl(voiceData.url); // 🔄 changed
        localStorage.setItem("voiceUrl", voiceData.url);
        console.log("Voice URL:", voiceData.url);



      } else {
        console.warn('Voice not returned properly:', voiceData); // 🔄 changed
        alert('Failed to generate voice narration.'); // 🔄 changed
        setVoiceUrl(''); // ✅ new
      }


    } catch (error) {
      console.error('Error during content generation:', error.response?.data || error.message);
      alert(
        `Something went wrong. ${
          error.response?.data?.detail
            ? JSON.stringify(error.response.data.detail)
            : 'Please try again later.'
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="back" 
        // style={{
        //   backgroundImage: "url('/dl.jpg')",backgroundSize: "cover",
        // backgroundRepeat: "no-repeat",
        // backgroundPosition: "center",}} 
        >
      <div className="container mt-5">
        <h1 className="mb-4 text-center tc fw-bold">🌙 DreamLab</h1>

        <div className="mb-3">
          {/* <label htmlFor="topicInput" className="form-l">Enter a Topic</label> */}
          <input
            type="text"
            className="form-cm"
            id="topicInput"
            placeholder="Enter a Topic ~  e.g. A magical forest at night"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        <div className="text-center ">
          <button
            className="btn btn-p mb-5"
            onClick={handleSubmit}
            disabled={loading || !topic.trim()}
          >
            {loading ? 'Generating...' : 'Generate Story'}
          </button>
        </div>

        <hr/>

        {story && (
          <div className="mb-5 gen-s">
            <h4 className='gi'>📝 Generated Story</h4>
            <p>{story}</p>
          </div>
        )}
        
        {imageUrls.length > 0 && (
          <div className="mb-5">
            <h4 className='mb-4 gi'>🖼️ Generated Images</h4>
            
            <div className="image-scroll-container" >
              {imageUrls.map((url, idx) => (
              <div key={idx} className="mb-3">
                <img src={url} alt={`Generated ${idx + 1}`} className="img-fluid im rounded mb-2" />
                <br />
                <a href={url} download={`generated-image-${idx + 1}.png`} target="_blank" rel="noopener noreferrer" className="btn btn-success">
                  ⬇️ Download Image {idx + 1}
                </a>
              </div>
            ))}
            </div>
            
          </div>
        )}

        
        {voiceUrl && voiceUrl.startsWith('http') && (
        <div className="mb-4 gen-v">
          <h4 className='gi'>🔊 Voice Narration</h4>
          <audio ref={audioRef} controls className="mb-2" preload="metadata">
            <source src={voiceUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <br />
          <a href={voiceUrl} download="voice-narration.mp3"   target="_blank"  rel="noopener noreferrer" className="btn btn-success">
            ⬇️ Download Voice
          </a>
        </div>
      )}
      </div>
    </div>
    
  );
};

export default DreamLab;
