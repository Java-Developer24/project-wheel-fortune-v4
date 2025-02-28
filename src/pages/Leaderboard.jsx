import { motion } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import guidesData from '../data/guides.json';
import useAuthStore from '../store/authStore';

export default function Leaderboard() {
  const { user } = useAuthStore();
  const [guides, setGuides] = useState([]);
  const [currentUserRank, setCurrentUserRank] = useState(null);
  const [bucketSections, setBucketSections] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    // Sort all guides by rank
    const sortedGuides = [...guidesData.guides].sort((a, b) => parseInt(a.Rank) - parseInt(b.Rank));
    setGuides(sortedGuides);

    // Group guides by bucket
    const sections = {};
    sortedGuides.forEach(guide => {
      if (!sections[guide.bucket]) {
        sections[guide.bucket] = [];
      }
      sections[guide.bucket].push(guide);
    });
    setBucketSections(sections);

    // Initialize refs for each bucket
    Object.keys(sections).forEach(bucket => {
      if (!sectionRefs.current[bucket]) {
        sectionRefs.current[bucket] = React.createRef();
      }
    });

    // Find current user's rank
    if (user) {
      const userName = user.username.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      
      const currentGuide = guidesData.guides.find(g => 
        g['name'].toLowerCase() === userName.toLowerCase()
      );
      
      if (currentGuide) {
        setCurrentUserRank(currentGuide);
      }
    }
  }, [user]);

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
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-r from-[#1a237e] via-[#4a148c] to-[#880e4f] py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
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
          
          {currentUserRank && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 bg-gradient-to-r from-purple-900/80 to-indigo-900/80 rounded-lg p-4 shadow-lg"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="relative">
                    <img
                      className="h-16 w-16 rounded-full border-2 border-yellow-400"
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUserRank['name']}`}
                      alt={currentUserRank['name']}
                    />
                    <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-gray-900 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm border-2 border-white">
                      #{currentUserRank.Rank}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-white">{currentUserRank['name']}</h3>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getBadgeColor(currentUserRank.bucket)} text-white`}>
                        {currentUserRank.bucket.charAt(0).toUpperCase() + currentUserRank.bucket.slice(1)} Tier
                      </span>
                      <div className="flex items-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 px-2.5 py-1 rounded-full">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path>
                        </svg>
                        <span className="text-xs font-bold">Level {getLevelShield(currentUserRank.Rank)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  {/* Shield with level info */}
                  <div className="mr-4 relative">
                    <motion.div 
                      className="w-16 h-16 flex items-center justify-center mt-2"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg transform rotate-45 "></div>
                      <div className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-lg transform rotate-45 flex items-center justify-center ">
                        <span className="text-white text-xl font-bold transform -rotate-45 mr">
                          {getLevelShield(currentUserRank.Rank)}
                        </span>
                      </div>
                    </motion.div>
                    <div className="text-center text-white text-xs mt-6 ">Level</div>
                  </div>
                  
                  <div className="flex items-center bg-white/20 rounded-lg p-3 mb-5 ml-2">
                    <div className="mr-4 text-center">
                      <div className="text-sm text-gray-200">Points</div>
                      <div className="text-2xl font-bold text-yellow-400">{parseInt(currentUserRank.Points).toLocaleString()}</div>
                    </div>
                    <div className="text-center">
                      {/* <div className="text-sm text-gray-200">Tier</div> */}
                      {/* <div className="text-2xl font-bold text-yellow-400">{currentUserRank.bucket.charAt(0).toUpperCase() + currentUserRank.bucket.slice(1)}</div> */}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 font-bold text-xl sticky top-0 z-10">
              Leaderboard Rankings
            </div>
            <div className="max-h-[500px] overflow-y-auto">
              {Object.keys(bucketSections).map((bucket, bucketIndex) => (
                <div key={bucket} ref={sectionRefs.current[bucket]}>
                  <div className={`sticky top-0 z-10 bg-gradient-to-r ${getBadgeColor(bucket)} text-white py-2 px-4 font-bold`}>
                    {bucket.charAt(0).toUpperCase() + bucket.slice(1)} Tier
                  </div>
                  <table className="min-w-full">
                    <thead className="bg-gray-100 sticky top-10 z-10">
                      <tr>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 w-16">Rank</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
                        <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Level</th>
                        <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700">Points</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {bucketSections[bucket].map((guide, index) => {
                        const isCurrentUser = user && user.username.toLowerCase() === guide['name'].toLowerCase().replace(' ', '_');
                        const level = getLevelShield(guide.Rank);
                        
                        return (
                          <motion.tr
                            key={guide.ID}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.01 }}
                            className={`${isCurrentUser ? 'bg-yellow-50' : 'hover:bg-gray-50'} transition-colors duration-150`}
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                {parseInt(guide.Rank) <= 3 && (
                                  <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r ${
                                    parseInt(guide.Rank) === 1 ? 'from-yellow-400 to-yellow-600' :
                                    parseInt(guide.Rank) === 2 ? 'from-gray-300 to-gray-500' :
                                    'from-amber-600 to-amber-800'
                                  } text-white text-sm font-bold`}>
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
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${guide['name']}`}
                                    alt={guide['name']}
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {guide['name']}
                                    {isCurrentUser && (
                                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        You
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <div className="flex justify-center">
                                <div className="flex items-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 px-2.5 py-1 rounded-full">
                                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path>
                                  </svg>
                                  <span className="text-xs font-bold">Level {level}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="text-sm font-semibold text-gray-900 px-3 py-1 rounded-full inline-block">
                                {parseInt(guide.Points).toLocaleString()} pts
                              </div>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}