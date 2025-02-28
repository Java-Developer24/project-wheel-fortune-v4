import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Home() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    // GSAP animations for text
    if (titleRef.current && subtitleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
      );
      
      gsap.fromTo(
        subtitleRef.current.children,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.2, 
          ease: "power3.out",
          delay: 0.5
        }
      );
    }
  }, []);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-r from-[#1a237e] via-[#4a148c] to-[#880e4f] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <div ref={titleRef}>
              <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-4xl">
                Welcome to <b className='text-yellow-500 md:text-6xl'><i>gaMEtrix </i></b>
              </h1>
              <h2 className="text-3xl font-bold text-white mt-2">
                Perform, Play, Prosper!
              </h2>
            </div>
            
            <div ref={subtitleRef} className="mt-6">
              <p className="text-lg text-white max-w-3xl">
                Experience a revolutionary <b className='text-yellow-500'>gamified performance dashboard </b> designed to <b className='text-yellow-500'>engage, motivate, and drive success.</b>
              </p>
              <br></br>
              <p>
                <b className='text-yellow-500'>gaMEtrix </b> transforms everyday tasks into exciting opportunities. 
              </p>
              <br />
              <p>
                Track your progress, earn rewards, and climb the leaderboard as you surpass performance and achieve milestones!
              </p>
            </div>
            
            <div className="mt-8 flex gap-4">
              <p className='mt-3 font-semibold text-white'> <b className='text-yellow-500'>Game on! </b>Your success starts here.</p>

              <Link
                to="/wheel"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-700 bg-yellow-400 hover:bg-yellow-500 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Whirl Of Wins
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative items-center justify-center"
          >
            <motion.div
              className="absolute top-60 left-60 transform  z-10"
              animate={{ 
                scale: [1, 1.2, 1],
                y: [0, -15, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img 
                src="/trophyy.webp" 
                alt="GoDaddy Logo" 
                className="w-40 h-40 object-contain rounded-lg"
              />
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="shadow-2xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <img 
                  src="/tshirt.webp" 
                  alt="GoDaddy T-shirt" 
                  className="w-full h-auto object-cover aspect-square"
                />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="shadow-2xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <img 
                  src="/mug.webp" 
                  alt="WFH Setup" 
                  className="w-full h-auto object-cover aspect-square"
                />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="shadow-2xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <img 
                  src="/bottlesip.webp" 
                  alt="Lucky Clover" 
                  className="w-full h-auto object-cover aspect-square"
                />
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                className="shadow-2xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <img 
                  src="/headsett.webp" 
                  alt="Premium Headset" 
                  className="w-full h-auto object-cover aspect-square"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}