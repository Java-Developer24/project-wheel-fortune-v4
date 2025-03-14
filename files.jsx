* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  @keyframes glitter {
    0%, 100% {
      filter: brightness(1) saturate(1) drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
    }
    25% {
      filter: brightness(1.2) saturate(1.1) drop-shadow(0 0 10px rgba(255, 255, 255, 0.7));
    }
    50% {
      filter: brightness(1.3) saturate(1.2) drop-shadow(0 0 15px rgba(255, 255, 255, 0.8));
    }
    75% {
      filter: brightness(1.2) saturate(1.1) drop-shadow(0 0 10px rgba(255, 255, 255, 0.7));
    }
  }
  
  body {
    background: linear-gradient(135deg, #1a237e, #4a148c, #880e4f);
    font-family: "Orbitron", sans-serif;
    height: 100vh;
    overflow: hidden;
    color: #ffffff;
  }
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  .no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  
  .app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    position: relative;
    overflow: hidden;
  }
  
  .decorative-circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    pointer-events: none;
  }
  
  .circle-1 {
    width: 300px;
    height: 300px;
    top: -150px;
    left: -150px;
  }
  
  .circle-2 {
    width: 200px;
    height: 200px;
    bottom: -100px;
    right: -100px;
  }
  
  .wheel-section {
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    width: 100%;
    max-width: 620px;
    position: relative;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    transition: transform 0.3s ease;
  }
  
  .wheel-section:hover {
    transform: translateY(-5px);
  }
  
  .logo-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }
  
  .logo {
    width: 110px;
    height: 60px;
    border-radius: 50%;
  }
  
  .logo-left-logo {
    width: 110px;
    height: 60px;
   /* padding-right: 10px; */
    transform: scale(1);
    transition: transform 0.3s ease;
  }
  
  .logo-left-logo:hover {
    transform: scale(1.1);
  }
  
  .logo-right-logo {
    width: 110px;
    height: 60px;
    transform: scale(1);
    transition: transform 0.3s ease;
  }
  
  .logo-right-logo:hover {
    transform: scale(1.1);
  }
  
  .img-sizing {
    border-radius: 10%;
    transition: filter 0.3s ease;
  }
  
  .img-sizing:hover {
    filter: brightness(1.2);
  }
  
  .lucky-spin-text {
    color: white;
    font-size: 2.0rem;
    font-weight: 1000;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    text-align: center;
    font-family: "Audiowide", cursive;
    background: white;
    -webkit-background-clip: text;
    /* -webkit-text-fill-color: transparent; */
    animation: titleGlow 2s ease-in-out infinite alternate;
  }
  
  @keyframes titleGlow {
    from {
      text-shadow: 0 0 10px rgba(187, 79, 243, 0.5),
                   0 0 20px rgba(187, 79, 243, 0.3),
                   0 0 30px rgba(187, 79, 243, 0.2);
    }
    to {
      text-shadow: 0 0 20px rgba(187, 79, 243, 0.8),
                   0 0 40px rgba(187, 79, 243, 0.5),
                   0 0 60px rgba(187, 79, 243, 0.3);
    }
  }
  
  .wheel-container {
    position: relative;
    width: 98%;
    aspect-ratio: 1;
    margin: 0 auto;
  }
  
  .wheel-outer {
    position: relative;
    width: 99%;
    height: 99%;
    border-radius: 50%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
  }
  
  .wheel-ring-outer {
    position: absolute;
    width: 96%;
    height: 96%;
    border-radius: 50%;
    border: 30px solid rgba(0, 0, 0, 0.925);
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3);
  }
  
  .wheel-ring-middle {
    position: absolute;
    width: 90%;
    height: 90%;
    border-radius: 50%;
    border: 30px solid #20d087;
    box-shadow: inset 0 0 15px rgba(32, 208, 135, 0.3);
  }
  
  .wheel-ring-inner {
    position: absolute;
    width: 85%;
    height: 85%;
    border-radius: 50%;
    border: 25px solid #ffdf0e;
    box-shadow: inset 0 0 15px rgba(255, 223, 14, 0.3);
  }
  
  .wheel-content {
    position: relative;
    width: 90%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: wheelGlow 3s ease-in-out infinite;
  }
  
  @keyframes wheelGlow {
    0%, 100% {
      filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.4))
             brightness(1);
    }
    50% {
      filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.7))
             brightness(1.2);
    }
  }
  
  .wheel-center-animation {
    position: absolute;
    width: 50px;
    height: 50px;
    background: #ffffff;
    border-radius: 50%;
    z-index: 10;
    border: 4px solid #ffee34;
    box-shadow: 0 0 15px rgba(249, 56, 39, 0.5),
                0 0 30px rgba(249, 56, 39, 0.3);
    animation: pulse 2s ease-in-out infinite;
  }
  
  .wheel-center {
    position: absolute;
    width: 60px;
    height: 60px;
    background: #ffffff;
    border-radius: 50%;
    z-index: 10;
    border: 4px solid #F93827;
    box-shadow: 0 0 15px rgba(249, 56, 39, 0.5),
                0 0 30px rgba(249, 56, 39, 0.3);
    animation: pulse 2s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); box-shadow: 0 0 15px rgba(249, 56, 39, 0.5); }
    50% { transform: scale(1.1); box-shadow: 0 0 30px rgba(249, 56, 39, 0.8); }
    100% { transform: scale(1); box-shadow: 0 0 15px rgba(249, 56, 39, 0.5); }
  }
  
  .placeholder-wheel-outer {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 28px solid #ffee34;
    box-shadow: 0 0 30px rgba(255, 238, 52, 0.3);
  }
  
  .placeholder-wheel {
    position: absolute;
    width: 105%;
    height: 105%;
    border-radius: 50%;
    background: conic-gradient(
      rgba(255, 255, 255, 0.9) 0deg 60deg,
      rgba(255, 244, 178, 0.9) 60deg 120deg,
      rgba(255, 255, 255, 0.9) 120deg 180deg,
      rgba(255, 244, 178, 0.9) 180deg 240deg,
      rgba(255, 255, 255, 0.9) 240deg 300deg,
      rgba(255, 244, 178, 0.9) 300deg 360deg
    );
    display: flex;
    align-items: center;
    justify-content: center;
    animation: spin 3s linear infinite;
    border: 25px solid #0A5EB0;
    box-shadow: 0 0 40px rgba(10, 94, 176, 0.4),
                inset 0 0 30px rgba(255, 215, 0, 0.5);
  }
  
  .placeholder-wheel::before {
    content: "";
    position: absolute;
    width: 110%;
    height: 110%;
    border-radius: 50%;
    background: conic-gradient(
      transparent 0deg 60deg,
      rgba(255, 215, 0, 0.4) 60deg 120deg,
      transparent 120deg 180deg,
      rgba(255, 215, 0, 0.4) 180deg 240deg,
      transparent 240deg 300deg,
      rgba(255, 215, 0, 0.4) 300deg 360deg
    );
    filter: blur(25px);
    pointer-events: none;
    z-index: 2;
    animation: glowSpin 4s linear infinite;
  }
  
  @keyframes glowSpin {
    0% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(180deg) scale(1.05); }
    100% { transform: rotate(360deg) scale(1); }
  }
  
  .placeholder-segments {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  
  .segment {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 50%;
    transform-origin: 0% 100%;
    border-left: 2px solid rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
  }
  
  .spin-button {
    position: relative;
    width: 100%;
    padding: 1rem;
    margin-top: 2rem;
    background: #FFD700;
    border: none;
    border-radius: 5px;
    font-size: 1.2rem;
    font-weight: bold;
    color: black;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: all 0.2s ease-in-out;
    box-shadow: 0px 6px 0px #b88c00, 0px 10px 15px rgba(0, 0, 0, 0.3);
    text-align: center;
  }
  
  .spin-button::before {
    content: "";
    position: absolute;
    top: 10%;
    left: 10%;
    width: 20%;
    height: 80%;
    background: rgba(255, 255, 255, 0.4);
    transform: skewX(-20deg);
    border-radius: 5px;
  }
  
  .spin-button:hover {
    transform: translateY(-3px);
    box-shadow: 0px 8px 0px #b88c00, 0px 12px 20px rgba(0, 0, 0, 0.3);
  }
  
  .spin-button:active {
    transform: translateY(3px);
    box-shadow: 0px 3px 0px #b88c00, 0px 6px 10px rgba(0, 0, 0, 0.2);
  }
  .dialog-button {
    background: linear-gradient(45deg, #ff416c, #ff4b2b);
    color: white;
    font-size: 1.2rem;
    padding: 12px 30px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(255, 50, 50, 0.4);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    font-family: "Orbitron", sans-serif;
  }
  
  .dialog-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: 0.5s;
  }
  
  .dialog-button:hover::before {
    left: 100%;
  }
  
  .dialog-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 50, 50, 0.6);
  }
  
  .dialog-title {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 15px;
    background: linear-gradient(45deg, #FFD700, #FFA500);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
    font-family: "Audiowide", cursive;
  }
  
  .custom-dialog {
    background: rgba(20, 20, 40, 0.95) !important;
    backdrop-filter: blur(10px);
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 30px;
    color: white;
    text-align: center;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  }
  
  .custom-input {
    width: 80%;
    padding: 12px;
    font-size: 1.2rem;
    text-align: center;
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    margin-bottom: 20px;
    outline: none;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    transition: all 0.3s ease;
    font-family: "Orbitron", sans-serif;
  }
  
  .custom-input:focus {
    border-color: #ff416c;
    box-shadow: 0 0 10px rgba(255, 65, 108, 0.3);
  }
  
  .confetti {
    position: absolute;
    width: 10px;
    height: 10px;
    opacity: 0;
    top: 50%;
    left: 50%;
    transform-origin: center;
  }
  
  .confetti.star {
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  }
  
  .confetti.circle {
    border-radius: 50%;
  }
  
  .confetti.triangle {
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }
  
  .confetti.diamond {
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  }
  
  @keyframes confetti-burst {
    0% {
      transform: translate(0, 0) scale(0) rotate(0deg);
      opacity: 1;
    }
    25% {
      opacity: 1;
      transform: translate(var(--tx), var(--ty)) scale(1) rotate(90deg);
    }
    50% {
      opacity: 1;
      transform: translate(calc(var(--tx) * 1.5), calc(var(--ty) * 1.5)) scale(1.5) rotate(180deg);
    }
    75% {
      opacity: 0.5;
      transform: translate(calc(var(--tx) * 2), calc(var(--ty) * 2)) scale(1) rotate(270deg);
    }
    100% {
      transform: translate(calc(var(--tx) * 2.5), calc(var(--ty) * 2.5)) scale(0) rotate(360deg);
      opacity: 0;
    }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    40% { transform: rotate(180deg); }
    50% { transform: rotate(180deg); }
    60% { transform: rotate(180deg); }
    100% { transform: rotate(1080deg); }
  }
  
  .trophy-icon {
    position: absolute;
    top: -60px;
    left: 45%;
    transform: translateX(-50%);
    font-size: 3rem;
    color: #FFD700;
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
    animation: float 3s ease-in-out infinite;
    z-index: 200;
  }
  
  @keyframes float {
    0% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(-10px); }
    100% { transform: translateX(-50%) translateY(0); }
  }
  
  /* Wheel Pointer Styles - Moved to top */
  .wheel-pointer {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    z-index: 20;
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
  }
  
  .wheel-pointer-triangle {
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 30px solid #F93827;
    position: absolute;
    top: 0;
    left: 0;
  }
  
  .wheel-pointer-circle {
    width: 20px;
    height: 20px;
    background-color: #F93827;
    border: 3px solid #ffee34;
    border-radius: 50%;
    position: absolute;
    top: -10px;
    left: 10px;
    box-shadow: 0 0 10px rgba(249, 56, 39, 0.7);
  }
  
  /* Balloon container styles */
  .left-balloons, .right-balloons {
    position: absolute;
    top: 0;
    height: 100%;
    width: 150px;
    z-index: 5;
    pointer-events: none;
  }
  
  .left-balloons {
    left: -150px;
  }
  
  .right-balloons {
    right: -150px;
  }
  
  /* Prize image styles */
  .prize-image-container {
    position: absolute;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(30px);
  }
  
  .prize-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }