import { useState, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';
import { motion, AnimatePresence } from 'framer-motion';
import Dialog from '@mui/material/Dialog';
import guidesData from '../data/guides.json';
import '../App.css';
import {Scene3D} from '../components/Scene3D';
// import {TrophyModel} from './components/Prize3D';

function SpinningWheel() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [guideId, setGuideId] = useState('');
  const [currentPrizes, setCurrentPrizes] = useState([]);
  const [bucketPrizes, setBucketPrizes] = useState([]);
  const [showWheel, setShowWheel] = useState(false);
  const [showWinDialog, setShowWinDialog] = useState(false);
  const [winningPrize, setWinningPrize] = useState('');
  const [currentGuide, setCurrentGuide] = useState(null);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [isPlaceholderSpinning, setIsPlaceholderSpinning] = useState(true);

  const wheelColors = ['#ffdf0e', '#9b59fb', '#eb7beb', '#b1ee31', '#2afcd5', '#20d087', '#3674B5'];
  const wheelData = currentPrizes.map((prize, index) => ({
    option: prize,
    style: {
      backgroundColor: wheelColors[index % wheelColors.length],
      textColor: '#FFFFFF',
      fontWeight: 'bold',
      textOrientation: 'vertical',
      textPosition: 'outer',
      boxShadow: `
        0 0 15px ${wheelColors[index % wheelColors.length]},
        inset 0 0 20px rgba(255, 255, 255, 0.5),
        0 0 30px ${wheelColors[index % wheelColors.length]},
        inset 0 0 10px ${wheelColors[index % wheelColors.length]}
      `,
      textShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
      animation: 'glitter 2s ease-in-out infinite'
    }
  }));

  useEffect(() => {
    let confettiInterval;
    if (isPlaceholderSpinning) {
      confettiInterval = setInterval(() => {
        createConfetti(50); // Reduced number of confetti particles
      }, 2000); // Increased interval
    }
    return () => clearInterval(confettiInterval);
  }, [isPlaceholderSpinning]);

  const sendPrizeEmail = async (guide, prize) => {
    const emailTemplate = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2c3e50; text-align: center;">🎉 Congratulations on Your Prize! 🎉</h2>
            
            <p>Dear ${guide.name},</p>
            
            <p>We're excited to inform you that you've won a fantastic prize in our GoDaddy Wheel of Fortune game!</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #e74c3c; text-align: center;">Your Prize: ${prize}</h3>
            </div>
            
            <p>Prize Details:</p>
            <ul>
              <li>Prize Category: ${guide.bucket.toUpperCase()}</li>
              <li>Guide ID: ${guide.id}</li>
              <li>Date Won: ${new Date().toLocaleDateString()}</li>
            </ul>
            
            <p>To claim your prize, please contact the HR department with your Guide ID.</p>
            
            <p>Best regards,<br>GoDaddy Team</p>
          </div>
        </body>
      </html>
    `;

    try {
      const response = await fetch('https://project-wheel-backend.onrender.com/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: guide.email,
          cc: guide.cc,
          subject: '🎉 Congratulations on Your Prize!',
          html: emailTemplate
        })
      });

      const data = await response.json();
      
      if (data.success) {
        console.log('Email sent successfully');
        console.log('Email preview URL:', data.previewUrl);
      } else {
        console.error('Failed to send email:', data.message);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleSpinClick = () => {
    if (!currentGuide) {
      setShowDialog(true);
      return;
    }

    if (!mustSpin && selectedPrize !== null) {
      setPrizeNumber(selectedPrize);
      setMustSpin(true);
    }
  };

  const PlaceholderWheel = () => {
    useEffect(() => {
      const spinInterval = setInterval(() => {
        setIsPlaceholderSpinning(prev => !prev);
        if (isPlaceholderSpinning) {
          createConfetti(30); // Reduced number of confetti particles
        }
      }, 4000); // Increased interval
      return () => clearInterval(spinInterval);
    }, []);

    return (
      <motion.div 
        className="wheel-container"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        
        <div className="placeholder-wheel-outer">
          <div className="placeholder-wheel">
            <motion.div 
              className="wheel-center-animation"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            ></motion.div>
            <div className="placeholder-segments">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="segment"
                  style={{ transform: `rotate(${i * 60}deg)` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const handleClaimPrize = () => {
    if (currentGuide && winningPrize) {
      sendPrizeEmail(currentGuide, winningPrize);
      console.log(`Prize claimed by ${currentGuide.name} (${currentGuide.id}): ${winningPrize}`);
    }
    
    setShowWinDialog(false);
    setMustSpin(false);
    setPrizeNumber(0);
    setBucketPrizes([]);
    setCurrentPrizes([]);
    setWinningPrize('');
    setGuideId('');
    setShowWheel(false);
    setCurrentGuide(null);
    setSelectedPrize(null);
    setIsPlaceholderSpinning(true);
    setTimeout(() => createConfetti(50), 500);
  };
  
  const handleGuideIdSubmit = () => {
    const guide = guidesData.guides.find(g => g.id === guideId);
    
    if (guide) {
      console.log(`Guide ${guide.name} (${guide.id}) authenticated`);
      setCurrentGuide(guide);
      const bucket = guide.bucket;
      const allPrizes = guidesData.allPrizes;
      const userBucketPrizes = guidesData.prizes[bucket];
      
      const winningPrizeIndex = Math.floor(Math.random() * userBucketPrizes.length);
      console.log(`Winning prize index: ${winningPrizeIndex}`);
      const selectedPrize = userBucketPrizes[winningPrizeIndex];
      
      setCurrentPrizes(allPrizes);
      setBucketPrizes(userBucketPrizes);
      setShowDialog(false);
      setShowWheel(true);
      
      const prizeIndexInWheel = allPrizes.findIndex(prize => prize === selectedPrize);
      setSelectedPrize(prizeIndexInWheel);
      setWinningPrize(selectedPrize);
      
      console.log(`Selected prize bucket: ${bucket}`);
      createConfetti(100);
    } else {
      console.error(`Invalid Guide ID: ${guideId}`);
      alert('Invalid Guide ID');
    }
  };

  const handleSpinStop = () => {
    setMustSpin(false);
    createConfetti(150);
    console.log(`Wheel stopped - Prize won: ${winningPrize}`);
    setTimeout(() => {
      setShowWinDialog(true);
    }, 1000);
  };

  const createConfetti = (count = 150) => {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);

    const colors = [
      '#FFD700',
      '#E82561',
      '#4A90E2',
      '#50E3C2',
      '#F5A623',
      '#D0021B',
      '#7ED321',
    ];
    
    const shapes = ['star', 'circle', 'triangle', 'diamond'];

    for (let i = 0; i < count; i++) {
      const confetti = document.createElement('div');
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      
      confetti.className = `confetti ${shape}`;
      
      const angle = (Math.random() * 360) * (Math.PI / 180);
      const velocity = 100 + Math.random() * 200;
      
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;
      
      confetti.style.setProperty('--tx', `${tx}px`);
      confetti.style.setProperty('--ty', `${ty}px`);
      
      const animationDuration = 1 + Math.random() * 2;
      const animationDelay = Math.random() * 0.5;
      
      confetti.style.animation = `confetti-burst ${animationDuration}s ease-out forwards`;
      confetti.style.animationDelay = `${animationDelay}s`;
      
      const size = 8 + Math.random() * 12;
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.boxShadow = '0 0 5px rgba(255, 255, 255, 0.8)';
      
      confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
      confettiContainer.remove();
    }, 4000);
  };
  
  return (
    <motion.div 
      className="app-container  bg-gradient-to-r from-[#1a237e] via-[#4a148c] to-[#880e4f] py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="decorative-circle circle-1"></div>
      <div className="decorative-circle circle-2"></div>
      
      <motion.div 
        className="wheel-section"
        
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Scene3D />
        <div className="trophy-icon">🏆</div>
        <motion.div 
          className="logo-container"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div 
            className="logo-left-logo"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img 
              className="img-sizing" 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaqVGwXfboLlsa3uQAI8Yim-rx9MrsRYED-w&s" 
              alt="Left Logo" 
            />
          </motion.div>
          <motion.h1 
            className="lucky-spin-text"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Wheel OF Fortune
          </motion.h1>
          <motion.div 
            className="logo-right-logo"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img 
              className="img-sizing"
              src="data:image/png;base64,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"
              alt="Right Logo"
            />
          </motion.div>
        </motion.div>
        
        <div className="wheel-container">
       
          <div className="wheel-outer">
            <div className="wheel-ring-outer"></div>
            <div className="wheel-ring-middle"></div>
            <div className="wheel-ring-inner"></div>
            {!showWheel ? (
              <PlaceholderWheel />
            ) : currentPrizes.length > 0 ? (
              <motion.div 
                className="wheel-content"
                initial={{ rotate: 0 }}
                animate={{ rotate: mustSpin ? 1080 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <Wheel
                  mustStartSpinning={mustSpin}
                  prizeNumber={prizeNumber}
                  data={wheelData}
                  onStopSpinning={handleSpinStop}
                  outerBorderColor="rgba(255, 255, 255, 0.8)"
                  outerBorderWidth={4}
                  innerRadius={20}
                  radiusLineColor="rgba(255, 255, 255, 0.5)"
                  radiusLineWidth={2}
                  textDistance={85}
                  fontSize={15}
                  spinDuration={0.8}
                  perpendicularText={true}
                />
                <motion.div 
                  className="wheel-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                ></motion.div>
              </motion.div>
            ) : (
              <motion.div 
                className="mega-win"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Wheel <br/> OF <br/> Fortune
              </motion.div>
            )}
          </div>
        </div>

        <motion.button 
          className="spin-button" 
          onClick={handleSpinClick}
          disabled={mustSpin}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {currentGuide ? 'SPIN' : 'CLICK TO ENTER ID'}
        </motion.button>
      </motion.div>

      <Dialog 
        open={showDialog}
        onClose={() => setShowDialog(false)}
        PaperProps={{
          className: 'custom-dialog'
        }}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="dialog-title">Enter Your Guide ID</div>
          <input
            type="text"
            className="custom-input"
            value={guideId}
            onChange={(e) => setGuideId(e.target.value)}
            placeholder="Enter ID"
          />
          <motion.button 
            className="dialog-button"
            onClick={handleGuideIdSubmit}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Go
          </motion.button>
        </motion.div>
      </Dialog>

      <AnimatePresence>
        <Dialog 
          open={showWinDialog}
          onClose={() => setShowWinDialog(false)}
          PaperProps={{
            className: 'custom-dialog'
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="dialog-title">Congratulations! 🎉</div>
            <div style={{ textAlign: 'center' }}>
              <motion.h2 
                style={{ color: '#fff', marginBottom: '1rem' }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                You've Won:
              </motion.h2>
              <motion.h1 
                style={{ color: '#FFD700', fontSize: '2rem', marginBottom: '2rem' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                {winningPrize}
              </motion.h1>
              <motion.button 
                className="dialog-button"
                onClick={handleClaimPrize}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Claim Prize
              </motion.button>
            </div>
          </motion.div>
        </Dialog>
      </AnimatePresence>
    </motion.div>
  );
}

export default SpinningWheel;
