import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-r from-[#1a237e] via-[#4a148c] to-[#880e4f] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Welcome to <b className='text-yellow-500'><i>gaMEtrix </i></b>-Perform, Play, Prosper!
            </h1>
            <p className="mt-6 text-lg text-white max-w-3xl">
            Experience a revolutionary <b className='text-yellow-500'>gamified performance dashboard </b> designed to <b className='text-yellow-500'>engage, motivate, and drive success.</b>
            </p>
            <br></br>
            <p>
            <b className='text-yellow-500'>gaMEtrix </b> transforms everyday tasks into exciting opportunities. Track your progress, earn rewards, and climb the leaderboard as you surpass performance and achieve milestones!
            </p>
            
            <div className="mt-8 flex gap-2">
            <p className='mt-2 font-semibold text-white'> <b className='text-yellow-500'>Game on! </b>Your success starts here.</p>

              <Link
                to="/wheel"
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 mb-10"
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
            
          </motion.div>
        </div>
      </div>
    </div>
  );
}