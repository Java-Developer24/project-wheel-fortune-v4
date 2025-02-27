import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import useAuthStore from '../store/authStore';
import guidesData from '../data/guides.json';

export default function Dashboard() {
  const { user, rewardsHistory, addReward } = useAuthStore();
  const [userGuide, setUserGuide] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [localRewardsHistory, setLocalRewardsHistory] = useState([]);

  useEffect(() => {
    if (user) {
      // Convert username to a name format (e.g., john_doe -> John Doe)
      const userName = user.username.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      
      // Find guide with matching name
      const guide = guidesData.guides.find(g => 
        g['name'].toLowerCase() === userName.toLowerCase()
      );
      
      if (guide) {
        setUserGuide(guide);
      }
    }

    // Combine rewards from the store with any from the guide data
    const combinedRewards = [];
    
    // Add rewards from the store
    if (rewardsHistory && rewardsHistory.length > 0) {
      combinedRewards.push(...rewardsHistory);
    }
    
    // Add rewards from guide data if available
    if (userGuide && userGuide.rewards) {
      const guideRewards = userGuide.rewards.split(',').filter(r => r.trim() !== '').map(reward => ({
        date: new Date().toISOString().split('T')[0], // Use current date as we don't have dates in the guide data
        reward: reward.trim(),
        points: '+' + Math.floor(Math.random() * 300 + 100) // Random points for demonstration
      }));
      
      if (guideRewards.length > 0) {
        combinedRewards.push(...guideRewards);
      }
    }
    
    // If no rewards are found, add some default ones
    if (combinedRewards.length === 0) {
      combinedRewards.push(
        { date: '2024-02-10', reward: 'Gold Prize', points: '+500' },
        { date: '2024-02-09', reward: 'Daily Login', points: '+100' },
        { date: '2024-02-08', reward: 'Completed Challenge', points: '+300' }
      );
    }
    
    setLocalRewardsHistory(combinedRewards);
  }, [user, rewardsHistory, userGuide]);

  // Calculate points data
  const pointsEarned = userGuide ? parseInt(userGuide.Points) : 0;
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

  const getBadgeColor = (bucket) => {
    switch (bucket) {
      case 'diamond': return 'from-blue-400 to-purple-500';
      case 'gold': return 'from-yellow-300 to-yellow-500';
      case 'silver': return 'from-gray-300 to-gray-500';
      case 'bronze': return 'from-amber-600 to-amber-800';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#1a237e] via-[#4a148c] to-[#880e4f] min-h-[calc(100vh-64px)] overflow-y-auto">
      <div className="mx-auto max-w-6xl">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight"
            >
              Welcome back, {userGuide ? userGuide['name'] : user.name}!
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
                  <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-6 rounded-lg">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center mb-4 md:mb-0">
                        <div className="relative">
                          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
                            {userGuide.bucket[0].toUpperCase()}
                          </div>
                          <motion.div 
                            className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm border-2 border-white"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {userGuide.Rank}
                          </motion.div>
                        </div>
                        <div className="ml-6">
                          <h4 className="text-xl font-bold capitalize">{userGuide.bucket} Tier</h4>
                          <div className="flex items-center mt-2 space-x-2">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getBadgeColor(userGuide.bucket)} text-white`}>
                              {userGuide.bucket.charAt(0).toUpperCase() + userGuide.bucket.slice(1)} Tier
                            </span>
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Rank {userGuide.Rank}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center bg-white/50 p-4 rounded-lg">
                        <div className="relative w-16 h-16">
                          <motion.div 
                            className="absolute inset-0 w-full h-full rounded-full bg-yellow-200"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
                            <span className="text-white text-xl font-bold">
                              {userGuide['Badges Earned']}
                            </span>
                          </div>
                        </div>
                        <span className="mt-2 text-sm font-medium text-gray-700">Badges Earned</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Rewards Section */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Rewards</h3>
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg overflow-hidden shadow">
                  <div className="max-h-[250px] overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-amber-100 sticky top-0">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Reward</th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Points</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {localRewardsHistory.slice(0, 3).map((reward, index) => (
                          <motion.tr 
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reward.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reward.reward}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 text-right font-medium">{reward.points}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="bg-amber-50 px-6 py-3 text-right">
                    <button 
                      onClick={() => setActiveTab('rewards')}
                      className="text-amber-600 hover:text-amber-800 text-sm font-medium"
                    >
                      View all rewards →
                    </button>
                  </div>
                </div>
              </div>
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
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Performance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {performanceMetrics.map((metric, index) => (
                        <motion.tr 
                          key={metric.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{metric.name}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{metric.value}</td>
                          <td className="whitespace-nowrap px-3 py-4">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <motion.div 
                                className="bg-blue-600 h-2.5 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(parseFloat(metric.value) * 10, 100)}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                              ></motion.div>
                            </div>
                          </td>
                        </motion.tr>
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
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div 
                  className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-lg p-4 shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
                        <span className="text-white text-lg">🏆</span>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">Total Rewards</h4>
                        <p className="text-2xl font-bold text-gray-900">{localRewardsHistory.length}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-4 shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-white text-lg">💰</span>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">Points Earned</h4>
                        <p className="text-2xl font-bold text-gray-900">+{localRewardsHistory.reduce((sum, reward) => sum + parseInt(reward.points.replace('+', '')), 0)}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4 shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-white text-lg">🎁</span>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">Latest Reward</h4>
                        <p className="text-lg font-bold text-gray-900">{localRewardsHistory[0]?.reward || 'None'}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
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
                    {localRewardsHistory.map((reward, index) => (
                      <motion.tr 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-gray-50 transition-colors"
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