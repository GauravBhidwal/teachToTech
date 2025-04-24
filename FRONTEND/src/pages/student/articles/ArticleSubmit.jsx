import React ,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import '../../../assets/css/articles/SubmitArticle.css'

const ArticleSubmit = () => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 8000); // Confetti for 4 seconds
    return () => clearTimeout(timer);
  }, []);
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };
  return (
    <div className='submit-container'>
       {showConfetti && <Confetti />}
      <div className="tick-icon">✅</div> 
     <p>
     Your article has been submitted successfully. It will be reviewed by admin. You can go back to home page.
     </p>  
     
     <button className='home-button' onClick={handleGoHome}>
        Go to Home
      </button>  
    </div>
  )
}

export default ArticleSubmit
