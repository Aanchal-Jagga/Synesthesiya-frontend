import React from 'react';
import './About.css'; // for styling

const About = () => {
  return (
    <div>
      <section style={{
        backgroundImage: "url('/screen.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}className="about-section ">
        <div className="story">
          <h1 className='work'>Our Story</h1>
          <p>
            Synesthesiya was born from a shared passion for storytelling and innovation. As students of AI and Data Science, we envisioned a platform that goes beyond traditional narratives — where stories could be seen, heard, and felt. What began as a simple idea soon evolved into a powerful tool that uses artificial intelligence to generate immersive experiences — blending text, sound, and visuals in harmony. Our journey has been about exploring the untapped potential of synesthesia-inspired technology to transform the way people interact with stories. With every update, we get closer to redefining storytelling for the digital age.
          </p>
        </div>
        
      </section>

      <section 
      style={{
        backgroundImage: "url('/try1.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="about-section ">
        <div className="mission-content">
          <h1 className='work2'>Our Mission</h1>
          <p>Our mission is to make storytelling a truly multisensory experience. By combining the power of AI with the beauty of human creativity, we aim to help users express, explore, and experience narratives in ways never before possible. Whether it’s generating music that matches a story’s mood or visuals that bring a scene to life, Synesthesiya is dedicated to unlocking new dimensions of imagination and emotion for creators, readers, and learners alike.</p>
        </div>
        
      </section>

      <section className="team-section">
        <div className="team-images">
          <img src="/gl.jpg" alt="Left Decoration" className="team-img left" />
          <img src="/boy.jpg" alt="Right Decoration" className="team-img right" />
        </div>
        <div className="team-content">
          <h1 className='work3'>Meet the Team</h1>
          <p>At Synesthesiya, we’re a passionate group of developers, designers, and storytellers united by a shared vision — to revolutionize how people experience stories. Our team brings together diverse skills in artificial intelligence, software engineering, creative design, and user experience to build a platform where imagination meets innovation.
          Each member plays a vital role in shaping Synesthesiya into a seamless, immersive experience. Whether it's crafting intuitive interfaces, developing powerful AI models, or ensuring smooth backend performance, we collaborate with one goal in mind: to make storytelling more dynamic, emotional, and accessible.
          Driven by curiosity and creativity, we believe in learning by building — and in building something that inspires.
          </p>
          
        </div>
      </section>

      <section className="about-section solid-section">
        <div className="join-content">
          <h1 className='work4'>Join Us</h1>
          <p>Synesthesiya is more than a project — it’s a growing movement toward immersive digital creativity. We’re looking for collaborators, dreamers, and innovators who believe in the future of AI-driven storytelling. Whether you're a developer, artist, musician, or writer, there’s space for your talent here. Join us in shaping the next frontier of narrative experience.

          <br />👉 Let’s build the future of storytelling — together.
          <br/>📬 Contact Us on <strong>synesthesiya.core@gmail.com</strong> to get involved!</p>
        </div>
        
      </section>
    </div>
  );
};

export default About;
