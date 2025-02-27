import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import guidesData from '../data/guides.json';
import useAuthStore from '../store/authStore';

export default function Leaderboard() {
  const { user } = useAuthStore();
  const [guides, setGuides] = useState({
    diamond: [],
    gold: [],
    silver: [],
    bronze: []
  });

  useEffect(() => {
    // Sort guides by rank and group by bucket
    const sortedGuides = {
      diamond: [],
      gold: [],
      silver: [],
      bronze: []
    };

    guidesData.guides.forEach(guide => {
      sortedGuides[guide.bucket].push(guide);
    });

    // Sort each bucket by rank
    Object.keys(sortedGuides).forEach(bucket => {
      sortedGuides[bucket].sort((a, b) => parseInt(a.Rank) - parseInt(b.Rank));
    });

    setGuides(sortedGuides);
  }, []);

  const getBadgeColor = (bucket) => {
    switch (bucket) {
      case 'diamond': return 'from-blue-400 to-purple-500';
      case 'gold': return 'from-yellow-300 to-yellow-500';
      case 'silver': return 'from-gray-300 to-gray-500';
      case 'bronze': return 'from-amber-600 to-amber-800';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const renderTierSection = (bucket, title) => (
    <div className="mb-8">
      <div className={`bg-gradient-to-r ${getBadgeColor(bucket)} text-white py-3 px-4 rounded-t-lg font-bold text-xl`}>
        {title}
      </div>
      <div className="bg-white rounded-b-lg shadow-lg overflow-hidden">
        <div className="max-h-[300px] overflow-y-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 w-16">Rank</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {guides[bucket].map((guide, index) => {
                const isCurrentUser = user && user.username.toLowerCase() === guide['Guide name'].toLowerCase().replace(' ', '_');
                
                return (
                  <motion.tr
                    key={guide.ID}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className={`${isCurrentUser ? 'bg-yellow-50' : 'hover:bg-gray-50'} transition-colors duration-150`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        {parseInt(guide.Rank) <= 3 && (
                          <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r ${
                            parseInt(guide.Rank) === 1 ? 'from-yellow-400 to-yellow-600' :
                            parseInt(guide.Rank) === 2 ? 'from-gray-300 to-gray-500' :
                            'from-amber-600 to-amber-800'
                          } text-white text-sm font-bold mr-2`}>
                            {guide.Rank}
                          </div>
                        )}
                        {parseInt(guide.Rank) > 3 && (
                          <span className="text-gray-700 font-medium ml-2">{guide.Rank}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${guide['Guide name']}`}
                            alt={guide['Guide name']}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {guide['Guide name']}
                            {isCurrentUser && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                You
                              </span>
                            )}
                          </div>
                          <div className="flex items-center mt-1">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gradient-to-r ${getBadgeColor(bucket)} text-white`}
                            >
                              {bucket.charAt(0).toUpperCase() + bucket.slice(1)}
                            </span>
                            {guide['Badges Earned'] && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                                {guide['Badges Earned']} Badges
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="text-sm font-semibold bg-gray-100 px-3 py-1 rounded-full inline-block">
                        {parseInt(guide.Points).toLocaleString()} pts
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-r from-[#1a237e] via-[#4a148c] to-[#880e4f] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-sm shadow-xl rounded-lg overflow-hidden p-6"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Champion's Corner
          </h2>
          
          {renderTierSection('diamond', 'Diamond')}
          {renderTierSection('gold', 'Gold')}
          {renderTierSection('silver', 'Silver')}
          {renderTierSection('bronze', 'Bronze')}
        </motion.div>
      </div>
    </div>
  );
}