import React from 'react'
import ceoimg from "../../assets/img/testimonials/testimonials-1.jpg"
import img2 from "../../assets/img/testimonials/testimonials-2.jpg"
import img3 from "../../assets/img/testimonials/testimonials-3.jpg"
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { FaCheck } from "react-icons/fa";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import '../../assets/css/Testimonials.css'

const Testimonials = () => {
    const testimonials = [
        {
          name: "Rajni Bajpai",
          role: "CEO & Founder",
          image: ceoimg,
          rating: 5,
          quote:
            "Welcome to TeachToTech, In today’s rapidly evolving world, staying ahead means continuously learning, adapting, and embracing change. At TeachToTech, our goal is simple—to equip you with the tools, knowledge, and confidence to succeed in your career and thrive in an ever-changing job market. We understand the challenges of bridging the gap between education and industry. That’s why we’ve built a platform that not only focuses on teaching the latest technologies but also emphasizes real-world application and job-ready skills. Our vision is to create opportunities for individuals from all walks of life, empowering them to unlock their potential and achieve their dreams. Whether you’re a student preparing for placements, a professional looking to upskill, or someone exploring a career shift, we’re here to guide and support you every step of the way. Thank you for choosing TeachToTech to be part of your journey. Let’s build your future together! Warm regards, Rajni Bajpai CEO, TeachToTech",
        },
        {
          name: "John Doe",
          role: "Senior Developer",
          image: img2,
          rating: 4,
          quote:
            "TeachToTech has been a game-changer for me! The hands-on experience and guidance provided have helped me bridge the gap between theoretical learning and practical implementation...",
        },
        {
          name: "Jane Smith",
          role: "Data Scientist",
          image: img3,
          rating: 5,
          quote:
            "Learning at TeachToTech has been an enriching journey. The mentors are incredibly supportive, and the platform’s focus on real-world applications is truly commendable...",
        },
      ];
    
  return (
    <div>
      <div className="testimonial-wrapper">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          navigation={{ clickable: true }}
          pagination={{ clickable: true }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-card">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="testimonial-img"
                />
                <div className="testimonial-content">
                  <h3>{testimonial.name}</h3>
                  <h4>{testimonial.role}</h4>
                  <div className="stars">{"⭐".repeat(testimonial.rating)}</div>
                  <p>
                    <i className="bi bi-quote quote-icon-left"></i>
                    {testimonial.quote}
                    <i className="bi bi-quote quote-icon-right"></i>
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Testimonials
