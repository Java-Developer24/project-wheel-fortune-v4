import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
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
            {/* <div className="flex items-center mb-6">
              <motion.img 
                src="/glogo.webp" 
                alt="GoDaddy Logo" 
                className="h-16 mr-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div> */}
            
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-5xl">
              Welcome to <b className='text-yellow-500'><i>gaMEtrix </i></b>-Perform, Play, Prosper!
            </h1>
            <p className="mt-6 text-lg text-white max-w-3xl">
              Experience a revolutionary <b className='text-yellow-500'>gamified performance dashboard </b> designed to <b className='text-yellow-500'>engage, motivate, and drive success.</b>
            </p>
            <br></br>
            <p>
              <b className='text-yellow-500'>gaMEtrix </b> transforms everyday tasks into exciting opportunities. Track your progress, earn rewards, and climb the leaderboard as you surpass performance and achieve milestones!
            </p>
            
            <div className="mt-8 flex gap-4">
              <p className='mt-2 font-semibold text-white'> <b className='text-yellow-500'>Game on! </b>Your success starts here.</p>

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
            className="relative"
          >
            {/* Centered floating logo */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
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
                src="/glogo.webp" 
                alt="GoDaddy Logo" 
                className="w-32 h-32 object-contain"
              />
            </motion.div>
            
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                animate={{ y: [0, -8, 0], scale: [1, 0.95, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="shadow-2xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <img 
                  src="/DALL·E 2025-02-27 02.18.35 - A 3D-rendered T-shirt with a stylish GoDaddy logo on the front, displayed on a mannequin or neatly folded, with a modern and sleek look.webp" 
                  alt="GoDaddy T-shirt" 
                  className="w-full h-auto object-cover aspect-square"
                />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, -8, 0], scale: [1, 0.95, 1] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="shadow-2xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <img 
                  src="/cofee.webp" 
                  alt="WFH Setup" 
                  className="w-full h-auto object-cover aspect-square"
                />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, -8, 0], scale: [1, 0.95, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="shadow-2xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <img 
                  src="/bottle.webp" 
                  alt="Lucky Clover" 
                  className="w-full h-auto object-cover aspect-square"
                />
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0], scale: [1, 0.95, 1] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                className="shadow-2xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <img 
                  src="/headsets.webp" 
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