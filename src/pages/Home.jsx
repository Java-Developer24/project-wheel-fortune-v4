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
              Practice customer interactions with a personalized AI Coach and get real-time feedback.
            </h1>
            <p className="mt-6 text-lg text-white max-w-3xl">
              "Improve your customer service skills with a personalized AI Coach that offers real-time feedback. Practice different scenarios, receive instant insights, and build confidence to handle any customer interaction effectively."
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                to="/leaderboard"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800"
              >
                Leadership Dashboard
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Personalized Dashboard
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