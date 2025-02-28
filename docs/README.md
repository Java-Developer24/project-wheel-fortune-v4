# Wheel of Fortune Documentation

## Overview
The Wheel of Fortune is an interactive web application built for GoDaddy's employee engagement program. It allows employees to spin a wheel and win various prizes based on their tier (diamond, gold, silver, bronze).

## Tech Stack

### Frontend
- **React** (v18.3.1) - Core framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **GSAP** - Advanced animations
- **React Three Fiber** - 3D rendering
- **Material-UI** - UI components
- **React Custom Roulette** - Wheel component

### Backend
- **Express** - Node.js web framework
- **Nodemailer** - Email functionality

## Architecture

### Component Structure
```
src/
├── components/
│   └── Prize3D.jsx       # 3D prize visualization
├── data/
│   └── guides.json       # User data and prize configurations
├── App.jsx              # Main application component
└── main.jsx            # Application entry point
```

### Features
1. **Authentication**
   - Guide ID verification
   - Tier-based prize allocation

2. **Prize Wheel**
   - Interactive spinning animation
   - Dynamic prize segments
   - 3D visual effects

3. **Prize Distribution**
   - Automated email notifications
   - Prize claim system
   - Manager CC functionality

4. **Visual Effects**
   - Confetti animations
   - GSAP animations
   - 3D prize models

## User Flow

1. **Initial Access**
   - User arrives at the landing page
   - Views animated placeholder wheel

2. **Authentication**
   - Clicks "CLICK TO ENTER ID"
   - Enters Guide ID
   - System validates ID and determines prize tier

3. **Wheel Interaction**
   - User clicks "SPIN"
   - Wheel animates and lands on prize
   - 3D prize visualization appears

4. **Prize Claim**
   - Congratulations dialog appears
   - User clicks "Claim Prize"
   - System sends email confirmation
   - Screen resets for next user

## Responsive Design
- Mobile-first approach
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## Animation System

### GSAP Animations
- Smooth transitions
- 3D object movements
- Text animations

### Confetti Effects
- Trigger points:
  - Initial load
  - Prize win
  - Prize claim

### 3D Elements
- React Three Fiber integration
- Interactive prize models
- Dynamic lighting effects

## Prize Tiers

### Diamond
- 🎉 Cheers
- 🌴 Earned Leave
- 🎧 Premium Headset

### Gold
- ☕ Coffee with Tuhin
- 🏠 WFH Perks

### Silver
- 🏠 WFH Perks
- 👕 GD T-Shirt

### Bronze
- 👕 GD T-Shirt
- 🍶 Water Bottle

## Maintenance

### Adding New Prizes
1. Update `guides.json`
2. Add prize to appropriate tier
3. Update `allPrizes` array

### Modifying User Data
1. Edit `guides.json`
2. Update user information
3. Ensure proper tier assignment




hey bolt . remove the scroll bar from the spin wheel page as well, try to make that prizes logo appear below the prize names  and also we want our  wheel pointer to be on top side of the wheel and make it look like in the screenshot  and also try to add those floating 3d ballons on right and left side of wheel of 3 ballons on right and 3 on left side and our complete wheel is getttin spining whne we click on spin as it only need to inner one adn while revealing as well it getting spin complete wheel which we dont want only inner wheel should spin and the wheel spin slowly for atleat 10 seconds and reveal the prize . now start 
