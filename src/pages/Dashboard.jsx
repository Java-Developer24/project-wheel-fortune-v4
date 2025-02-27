import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import useAuthStore from '../store/authStore';
import guidesData from '../data/guides.json';

export default function Dashboard() {
  const { user } = useAuthStore();
  const [userGuide, setUserGuide] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [rewardsHistory, setRewardsHistory] = useState([
    { date: '2024-02-10', reward: 'Gold Prize', points: '+500' },
    { date: '2024-02-09', reward: 'Daily Login', points: '+100' },
    { date: '2024-02-08', reward: 'Completed Challenge', points: '+300' },
  ]);

  useEffect(() => {
    if (user) {
      // Convert username to a name format (e.g., john_doe -> John Doe)
      const userName = user.username.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      
      // Find guide with matching name
      const guide = guidesData.guides.find(g => 
        g['Guide name'].toLowerCase() === userName.toLowerCase()
      );
      
      if (guide) {
        setUserGuide(guide);
      }
    }
  }, [user]);

  // Calculate points data
  const pointsEarned = userGuide ? parseInt(userGuide.Points) * 2 : 0; // Example calculation
  const pointsRedeemed = 500; // Example value
  const pointsBalance = pointsEarned - pointsRedeemed;

  const stats = [
    { name: 'Total Points Earned', value: pointsEarned.toLocaleString() },
    { name: 'Points Redeemed', value: pointsRedeemed.toLocaleString() },
    { name: 'Points Balance', value: pointsBalance.toLocaleString() },
    { name: 'Rank', value: userGuide ? `#${userGuide.Rank}` : '-' },
  ];

  const performanceMetrics = userGuide ? [
    { name: 'Refund %', value: userGuide['Refund%'] },
    { name: 'NRPC', value: userGuide['NRPC'] },
    { name: 'New Revenue %', value: userGuide['New Revenue %'] },
    { name: 'New con%', value: userGuide['New con%'] },
    { name: 'NPS', value: userGuide['NPS'] },
    { name: 'CPD', value: userGuide['CPD'] },
    { name: 'WOW Learning', value: userGuide['WOW Learning'] },
  ] : [];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#1a237e] via-[#4a148c] to-[#880e4f] min-h-[calc(100vh-64px)]">
      <div className="mx-auto max-w-6xl">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight"
            >
              Welcome back, {userGuide ? userGuide['Guide name'] : user.name}!
            </motion.h2>
          </div>
        </div>

        <div className="mt-4 flex space-x-4 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-t-lg font-medium ${
              activeTab === 'overview'
                ? 'bg-white text-purple-800'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`px-4 py-2 rounded-t-lg font-medium ${
              activeTab === 'performance'
                ? 'bg-white text-purple-800'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Performance Metrics
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`px-4 py-2 rounded-t-lg font-medium ${
              activeTab === 'rewards'
                ? 'bg-white text-purple-800'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Rewards Earned
          </button>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-1 bg-white rounded-lg shadow-xl p-6"
        >
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Points Summary</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-purple-50 to-indigo-50 overflow-hidden shadow rounded-lg"
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
              </div>

              {userGuide && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Tier Information</h3>
                  <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                        {userGuide.bucket[0].toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold capitalize">{userGuide.bucket} Tier</h4>
                        <p className="text-gray-600">
                          Badges Earned: {userGuide['Badges Earned']}
                        </p>
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Rank {userGuide.Rank}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'performance' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Performance Metrics</h3>
              
              {userGuide ? (
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Metric</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {performanceMetrics.map((metric) => (
                        <tr key={metric.name}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{metric.name}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{metric.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">No performance data available</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'rewards' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Rewards History</h3>
              
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Date</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Reward</th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {rewardsHistory.map((reward, index) => (
                      <motion.tr 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{reward.date}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{reward.reward}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-green-600 text-right font-medium">{reward.points}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}