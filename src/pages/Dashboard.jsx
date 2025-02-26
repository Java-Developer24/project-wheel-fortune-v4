import { motion } from 'framer-motion';
import useAuthStore from '../store/authStore';

export default function Dashboard() {
  const { user } = useAuthStore();

  const stats = [
    { name: 'Total Points', value: user.points.toLocaleString() },
    { name: 'Rank', value: `#${user.rank}` },
    { name: 'Achievements', value: user.achievements.length },
  ];

  const recentActivity = [
    { date: '2024-02-10', action: 'Won Gold Prize', points: '+500' },
    { date: '2024-02-09', action: 'Daily Login', points: '+100' },
    { date: '2024-02-08', action: 'Completed Challenge', points: '+300' },
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
            >
              Welcome back, {user.name}!
            </motion.h2>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {/* Stats */}
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 text-xl font-semibold">
                        {stat.name[0]}
                      </span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white shadow rounded-lg"
          >
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Achievements</h3>
              <div className="mt-4 flow-root">
                <div className="flex flex-wrap gap-2">
                  {user.achievements.map((achievement, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                    >
                      {achievement}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white shadow rounded-lg"
          >
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">
                Recent Activity
              </h3>
              <div className="mt-4 flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {recentActivity.map((activity, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="py-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {activity.action}
                          </p>
                          <p className="text-sm text-gray-500">{activity.date}</p>
                        </div>
                        <div className="text-sm font-semibold text-green-600">
                          {activity.points}
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}