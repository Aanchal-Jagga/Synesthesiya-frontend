import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Echoes.css';

const axiosInstance = axios.create({
  timeout: 120000,
});

const Echoes = () => {
  const [text, setText] = useState('');
  const [voiceUrl, setVoiceUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (voiceUrl && audioRef.current) {
      setTimeout(() => {
        audioRef.current.load();
      }, 50);
    }
  }, [voiceUrl]);

  const handleGenerateVoice = async () => {
    if (!text.trim()) {
      alert("Please enter some text.");
      return;
    }

    setLoading(true);
    setVoiceUrl('');

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
        'https://synesthesiya-backend-po7u.onrender.com/text-to-speech',
        {
          text: text.trim(),
          voice_id: 'en-US-Standard-D', // or dynamic if needed
          user_id: localId,
          cache: true
        },
        config
      );

      const voiceData = response?.data;
      if (voiceData?.url && voiceData.url.startsWith("http")) {
        setVoiceUrl(voiceData.url);
      } else {
        alert("Failed to generate voice.");
        console.warn("Voice generation response:", voiceData);
      }

    } catch (err) {
      console.error("Voice generation error:", err.response?.data || err.message);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 echoes ">
      <h1 className="text-center mb-4 echo">🔊 Echoes</h1>

      <div className="mb-3 ">
        {/* <label htmlFor="textInput" className="form-label">Enter your text</label> */}
        <textarea
          className=" form-c"
          id="textInput"
          rows="5"
          placeholder="Enter your text~ 
          e.g. The stars shimmered over the tranquil sea..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="text-center mb-4">
        <button
          className="btn btn-g"
          onClick={handleGenerateVoice}
          disabled={loading || !text.trim()}
        >
          {loading ? 'Generating...' : 'Generate Voice'}
        </button>
      </div>

      {voiceUrl && (
        <div className="text-center gen-v">
          <hr></hr>
          <h2 className='ec'>🎧 Your Voice Echo</h2>
          <audio ref={audioRef} controls preload="metadata" className="mb-2">
            <source src={voiceUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <br />
          <a href={voiceUrl} download="echoes-voice.mp3" target="_blank" rel="noopener noreferrer" className="btn btn-success">
            ⬇️ Download Voice
          </a>
        </div>
      )}
    </div>
  );
};

export default Echoes;
