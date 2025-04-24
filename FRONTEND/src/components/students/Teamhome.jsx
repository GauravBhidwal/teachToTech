import React from 'react'
import Rahul from '../../assets/img/team/Rahul.jpg'
import Ayushi from '../../assets/img/team/ayushi_image.jpg'
import Rajeev from '../../assets/img/team/RajeevPNG.png'
import '../../assets/css/Teamhome.css'
import { RiTwitterXLine } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
const teamMembers = [
  {
    name: "Rahul Dixit",
    degree: "Full Stack Trainer",
    description:
      "Trainer & Talks About #C++ #Java #DSA #Algorithms #datastructures #DevOps #Jenkins #CI/CD Over 8500+ students taught and placed in several companies worked With Great Learning",
    image: Rahul,
  },
  {
    name: "Ayushi Gupta",
    degree: "Developer",
    description:
      "Ayushi is a proficient web developer skilled in frontend and backend development, creating responsive, user-friendly applications with modern technologies.",
    image: Ayushi,
  },
  {
    name: "Anoushka Goel",
    degree: "Developer",
    description:
      "A passionate tech enthusiast skilled in C, C++, Python, SQL, PowerBI, and Excel. Abhishek has led projects like IoT malware detection using machine learning, sales analysis through dynamic dashboards, and sorting algorithm systems.",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Rajeev Singh",
    degree: "DSA Trainer",
    description:
      "Rajeev Singh is a versatile professional skilled in web development, DevOps, machine learning, and algorithms, delivering scalable and efficient tech solutions.",
    image: Rajeev,
  },
];


const Teamhome = () => {
  return (
    <div className="team-container">
    <div className="team-grid">
      {teamMembers.map((member, index) => (
        <div key={index} className="team-card">
          <div className="team-front">
            <img src={member.image} alt={member.name} className="team-image" />
            <h2 className="team-name">{member.name}</h2>
            <p className="team-degree">{member.degree}</p>
          </div>
          <div className="team-back">
            <p className="team-description">{member.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
  


  )
}

export default Teamhome
