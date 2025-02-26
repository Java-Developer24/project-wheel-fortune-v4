import { motion } from 'framer-motion';
import users from '../data/users.json';

export default function Leaderboard() {
  const sortedUsers = [...users.users].sort((a, b) => b.points - a.points);

  return (
    <div className="   py-8 px-4 sm:px-6 lg:px-8  bg-gradient-to-r from-[#1a237e] via-[#4a148c] to-[#880e4f] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-lg overflow-hidden"
        >
          <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-600 to-indigo-600">
            <h3 className="text-2xl leading-6 font-bold text-white text-center">
              Leaderboard
            </h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {sortedUsers.map((user, index) => (
              <motion.li
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 relative">
                      {index < 3 && (
                        <div className="absolute -top-2 -left-2 w-6 h-6 flex items-center justify-center rounded-full bg-yellow-400 text-white text-sm font-bold">
                          {index + 1}
                        </div>
                      )}
                      <img
                        className="h-12 w-12 rounded-full"
                        src={user.avatar}
                        alt={user.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="flex items-center mt-1">
                        {user.achievements.map((achievement, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800 mr-2"
                          >
                            {achievement}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-sm text-gray-900 font-semibold bg-gray-100 px-3 py-1 rounded-full">
                      {user.points.toLocaleString()} pts
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}