import React ,{useEffect, useRef} from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../assets/css/Contact.css";
import Header from './Header'
import Footer from './Footer'
import '../../assets/css/Contact.css'
import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import emailjs from '@emailjs/browser';


const Contact = () => {
	useEffect(() => {
		AOS.init({ duration: 1000 });
	  }, []);
    const form = useRef();
  function sendEmail(e){
    e.preventDefault();
    emailjs.sendForm('service_fesx0s7','template_ehty32j',form.current,{
      publicKey:'XVo5Wd15ZPiaqiyps'
    })
    .then((result) => {
      console.log(result.text);
      alert("Message sent successfully!");
      form.current.reset(); 
    },(error) =>{
      console.log(error.text);
      alert("Failed to send message, please try again.")
    });
  };
  return (
    <div>
      <Header />
      <div className="font-look3 dark">
      <div className="content-box" data-aos="fade-in" data-aos-delay="200">
        <div className="font-text">Contact us</div>
        <p className='content'>Have questions or need assistance? We’re here to help!
						<br/>
						📧 Email: posttoteachtotech@gmail.com
						<br/>
						📞 Phone: +91-9015088066
						<br/>
						🌐 Website: www.teachtotech.in
						<br/>
						Reach out to us for inquiries about courses, internships, or anything tech-related. Let’s
						connect and build your future in technology together!
		</p>
       
      </div>
      
    </div>
    <nav class="breadcrumbs">
				<div class="container">
					<ol>
						<li><a href="/index">Home </a></li><span>/</span>
						<li class="current"> Contact us</li>
					</ol>
				</div>
	 </nav>
	 <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.427799106508!2d77.40414227495728!3d28.646906783428772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf14cb1255abf%3A0xd63ee65ce19b694d!2sPrateek%20Grand%20City!5e0!3m2!1sen!2sin!4v1743306663233!5m2!1sen!2sin" 
	 width="1890"
	  height="480" 
	  style={{border:"none",padding:"2px",margin:"4px 0px"}} allowfullscreen=""
	   loading="lazy"
	    referrerpolicy="no-referrer-when-downgrade"></iframe>
	 <div className="contact-container">
      <div className="contact-info"  data-aos="fade-up" data-aos-delay="500">
            <div className="info-item">
            <div className="icon"><IoLocationOutline /></div>
            <div>
                <h3>Address</h3>
                <p>C7, Prateek Grand City, Ghaziabad</p>
            </div>
            </div>
            <div className="info-item">
            <div className="icon"><FiPhone /></div>
            <div>
                <h3>Call Us</h3>
                <p>+91-9015088066</p>
            </div>
            </div>
            <div className="info-item">
            <div className="icon"><MdOutlineMail /></div>
            <div>
                <h3>Email Us</h3>
                <p>posttoteachtotech@gmail.com</p>
            </div>
            </div>
      </div>

      <div className="contact-form" data-aos="fade-up" data-aos-delay="600">
        <form ref={form} onSubmit = {sendEmail}>
          <div className="input-group">
            <input type="text" name="name" placeholder="Your Name" />
            <input type="email" name="your-email" placeholder="Your Email" />
          </div>
          <textarea className="big-box" name="message" placeholder="Message" rows="8"></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
	  </div>
      <Footer />
    </div>
  )
}

export default Contact
