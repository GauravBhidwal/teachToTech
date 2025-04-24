import React, { useEffect, useState } from "react";
import Header from "./Header";
import "../../assets/css/Team.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./Footer";
import axios from "axios";
import { FaLinkedin } from "react-icons/fa";


const Team = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.post("http://localhost:8080/trainer/getAlltrainers");
        const data = response.data;

        if (data.status === "SUCCESS" && data.trainerList) {
          setTrainers(data.trainerList);
        } else {
          console.error("Failed to fetch trainers:", data.message);
        }
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };

    fetchTrainers();
  }, []);

  return (
    <div>
      <Header />
      <div className="font-look5">
        <div className="content-box" data-aos="fade-up" data-aos-delay="200">
          <h2 className="font-text">Meet Our TeachToTech Team</h2>
          <p className="content">
            At TeachToTech, our teams consist of skilled trainers and developers who work simultaneously to provide an unparalleled learning experience.
            With expertise spanning full stack development, competitive programming, web development, internships, programming, cybersecurity, AI, cloud computing, and more,
            they bring both theoretical knowledge and real-world application to every session. Our trainers and developers are not just educators—they're mentors and practitioners,
            committed to guiding you through your learning journey and equipping you with the skills and confidence to excel in the tech world.
            Learn from the best, and let’s shape the future of technology together!
          </p>
        </div>
      </div>

      <nav className="breadcrumbs">
        <div className="container">
          <a href="/">Home</a><span> / Team </span>
        </div>
      </nav>

      <div className="team-container">
  <div className="team-grid">
    {trainers.map((trainer, index) => (
      <div key={index} className="team-card">
        <img
          src={`http://localhost:8080/images/${trainer.trainerImage}`}
          alt={trainer.trainerName}
          className="team-image"
        />
        <div className="team-name-container">
          <h2 className="team-name">{trainer.trainerName}</h2>
          {trainer.linkedin && (
            <a
              href={trainer.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin-link"
            >
              <FaLinkedin size={24} />
            </a>
          )}
        </div>
        <p className="team-degree">{trainer.trainerQualification}</p>
        <p className="team-description">{trainer.trainerDescription}</p>
      </div>
    ))}
  </div>
</div>


      <Footer />
    </div>
  );
};

export default Team;
