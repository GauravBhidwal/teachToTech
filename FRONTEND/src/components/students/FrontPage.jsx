import React from 'react';
import '../../assets/css/FrontPage.css';

const FrontPage = () => {
  return (
    <div className="font-look">
      <div className="content-box">
        <div className="font-text">Learn, Execute, Deploy,</div>
        <div className="font-text">and Lead the Future</div>
        <div className="content">
          "We are a team of trainers and developers committed to bringing the essence of emerging technologies to life. Our mission is to bridge the gap between learners and developers, empowering individuals with the skills and transformation needed to thrive in the tech-driven future."
        </div>
        <div className="button-group">
          <button className="btn">Get Started</button>
          <button className="btn">Register</button>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;