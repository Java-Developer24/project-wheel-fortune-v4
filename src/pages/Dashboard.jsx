import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import useAuthStore from '../store/authStore';
import guidesData from '../data/guides.json';

export default function Dashboard() {
  const { user, rewardsHistory } = useAuthStore();
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
        { date: '2024-02-10', reward: 'Shopping Voucher', points: '-500' },
        { date: '2024-02-09', reward: 'Cheers', points: '-500' },
        { date: '2024-02-08', reward: 'Premium Headset', points: '-500' }
      );
    }
    
    setLocalRewardsHistory(combinedRewards);
  }, [user, rewardsHistory, userGuide]);

  // Calculate points data
  const pointsEarned = userGuide ? parseInt(userGuide.Points) : 0;
  const pointsRedeemed = rewardsHistory.length * 500; // 500 points per spin
  const pointsBalance = pointsEarned - pointsRedeemed;

  const stats = [
    { name: 'Total Points Earned', value: pointsEarned.toLocaleString(), icon: '🏆' },
    { name: 'Points Redeemed', value: pointsRedeemed.toLocaleString(), icon: '💰' },
    { name: 'Balance Points', value: pointsBalance.toLocaleString(), icon: '💎' },
    { name: 'Rank', value: userGuide ? `#${userGuide.Rank}` : '', icon: '🥇' },
  ];

  const getPerformanceStatus = (metric, value) => {
    const numValue = parseFloat(value);
    
    switch(metric) {
      case 'Refund%':
        return numValue < 5 ? 'Excellent' : 'Needs Improvement';
      case 'NRPC $':
        return numValue > 25 ? 'Excellent' : 'Needs Improvement';
      case 'New Revenue %':
        return numValue > 100 ? 'Excellent' : 'Needs Improvement';
      case 'New con%':
        return numValue > 12 ? 'Excellent' : 'Needs Improvement';
      case 'NPS':
        return numValue > 65 ? 'Excellent' : 'Needs Improvement';
      case 'CPD':
        return numValue > 20 ? 'Excellent' : 'Needs Improvement';
      case 'WOW Learning':
        return numValue > 70 ? 'Excellent' : 'Needs Improvement';
      default:
        return 'N/A';
    }
  };

  const getPerformanceColor = (status) => {
    return status === 'Excellent' ? 'text-green-600' : 'text-red-600';
  };

  const getPerformanceWidth = (metric, value) => {
    const numValue = parseFloat(value);
    
    switch(metric) {
      case 'Refund%':
        return `${Math.min(100 - (numValue * 20), 100)}%`; // Lower is better
      case 'NRPC $':
        return `${Math.min((numValue / 25) * 100, 100)}%`;
      case 'New Revenue %':
        return `${Math.min((numValue / 100) * 100, 100)}%`;
      case 'New con%':
        return `${Math.min((numValue / 12) * 100, 100)}%`;
      case 'NPS':
        return `${Math.min((numValue / 65) * 100, 100)}%`;
      case 'CPD':
        return `${Math.min((numValue / 20) * 100, 100)}%`;
      case 'WOW Learning':
        return `${Math.min(numValue * 100, 100)}%`;
      default:
        return '0%';
    }
  };

  const getTargetText = (metric) => {
    switch(metric) {
      case 'Refund%':
        return 'Target: <5%';
      case 'NRPC $':
        return 'Target: 25.00$';
      case 'New Revenue %':
        return 'Target: 100%';
      case 'New con%':
        return 'Target: 12%';
      case 'NPS':
        return 'Target: 65';
      case 'CPD':
        return 'Target: 20';
      case 'WOW Learning':
        return 'Target: 70%';
      default:
        return '';
    }
  };

  const performanceMetrics = userGuide ? [
    { name: 'Refund%', value: userGuide['Refund%'], color: 'from-blue-400 to-blue-600' },
    { name: 'NRPC $', value: userGuide['NRPC'], color: 'from-purple-400 to-purple-600' },
    { name: 'New Revenue %', value: userGuide['New Revenue %'], color: 'from-green-400 to-green-600' },
    { name: 'New con%', value: userGuide['New con%'], color: 'from-yellow-400 to-yellow-600' },
    { name: 'NPS', value: userGuide['NPS'], color: 'from-red-400 to-red-600' },
    { name: 'CPD', value: userGuide['CPD'], color: 'from-indigo-400 to-indigo-600' },
    { name: 'WOW Learning', value: userGuide['WOW Learning'], color: 'from-pink-400 to-pink-600' },
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

  const getLevelShield = (rank) => {
    const rankNum = parseInt(rank);
    if (rankNum <= 15) return 3;
    if (rankNum <= 50) return 2;
    return 1;
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
                              {stat.icon}
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
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1"></div>
                  </motion.div>
                ))}
              </div>

              {userGuide && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">User Information</h3>
                  <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-6 rounded-lg">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center mb-4 md:mb-0">
                        <div className="relative">
                          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
                            {userGuide.name[0].toUpperCase()}
                          </div>
                          <div className="absolute -top-2 -right-2">
                            <motion.div 
                              className="hexagon-shield"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <div className="hexagon-content flex items-center justify-center">
                                <span className="text-xs font-bold">{userGuide.Rank}</span>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                        <div className="ml-6">
                          <h4 className="text-xl text-black font-bold">{userGuide.name}</h4>
                          <div className="flex items-center mt-2 space-x-2">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getBadgeColor(userGuide.bucket)} text-white`}>
                              {userGuide.bucket.charAt(0).toUpperCase() + userGuide.bucket.slice(1)} Tier
                            </span>
                            <div className="flex items-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 px-2.5 py-1 rounded-full">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path>
                              </svg>
                              <span className="text-xs font-bold">Level {getLevelShield(userGuide.Rank)}</span>
                            </div>
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
                              {getLevelShield(userGuide.Rank)}
                            </span>
                          </div>
                        </div>
                        <span className="mt-2 text-sm font-medium text-gray-700">Level</span>
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
                            className="hover:bg-amber-50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reward.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex items-center">
                                <span className="w-8 h-8 flex items-center justify-center bg-amber-100 rounded-full mr-2 text-amber-600">
                                  {reward.reward.includes('Gold') ? '🏆' : 
                                   reward.reward.includes('Daily') ? '📅' : '🏆'}
                                </span>
                                {reward.reward}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-red-600 text-right font-medium">{reward.points}</td>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {performanceMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-lg font-semibold text-gray-800">{metric.name}</h4>
                        <div className="flex items-center">
                          <span className="text-lg font-bold text-indigo-600 mr-2">{metric.value}</span>
                          <span className="text-xs text-gray-500">{getTargetText(metric.name)}</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                        <motion.div 
                          className={`h-4 rounded-full bg-gradient-to-r ${metric.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: getPerformanceWidth(metric.name, metric.value) }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        ></motion.div>
                      </div>
                      <div className="mt-2 text-sm text-gray-500 flex justify-between">
                        <span>
                          Status:
                        </span>
                        <span className={getPerformanceColor(getPerformanceStatus(metric.name, metric.value))}>
                          {getPerformanceStatus(metric.name, metric.value)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
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
                    <motion.div 
                      className="w-12 h-12 flex items-center justify-center"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-yellow-500">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                      </svg>
                    </motion.div>
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
                        <h4 className="text-sm font-medium text-gray-900">Points Redeemed</h4>
                        <p className="text-2xl font-bold text-gray-900">{pointsRedeemed}</p>
                      </div>
                    </div>
                    <motion.div 
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-3xl"
                    >
                      💸
                    </motion.div>
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
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-3xl"
                    >
                      🎉
                    </motion.div>
                  </div>
                </motion.div>
              </div>
              
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Date</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Reward</th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Points Redeemed</th>
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
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <span className="w-8 h-8 flex items-center justify-center bg-indigo-100 rounded-full mr-2 text-indigo-600">
                              {reward.reward.includes('Shopping') ? '🛒' : 
                               reward.reward.includes('Mug') ? '📅' : 
                               reward.reward.includes('T-shirt') ? '👕' : 
                               reward.reward.includes('Headset') ? '🎧' : 
                               reward.reward.includes('Coffee') ? '☕' : 
                               reward.reward.includes('WFH') ? '🏠' : 
                               reward.reward.includes('Sipper') ? '🥤' : 
                               reward.reward.includes('Cheers') ? '🎉' : '🎁'}
                            </span>
                            {reward.reward}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-red-600 text-right font-medium">-500</td>
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