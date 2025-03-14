import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import users from '../data/users.json';
import guidesData from '../data/guides.json';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      error: null,
      rewardsHistory: [],

      login: (username, password) => {
        // First try to find the user in the users.json file
        const user = users.users.find(
          (u) => u.username === username && u.password === password
        );

        if (user) {
          set({ user, isAuthenticated: true, error: null });
          return true;
        }

        // If not found in users.json, try to find in guides.json
        const guideName = username.split('_').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        
        const guide = guidesData.guides.find(g => 
          g['name'].toLowerCase() === guideName.toLowerCase() && password === 'password123'
        );

        if (guide) {
          // Create a user object from guide data
          const guideUser = {
            id: guide.ID,
            username: username,
            password: password,
            name: guide.name,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${guide.name}`,
            points: parseInt(guide.Points),
            rank: parseInt(guide.Rank),
            achievements: [guide.bucket + " Tier"]
          };
          
          set({ user: guideUser, isAuthenticated: true, error: null });
          return true;
        }

        set({ error: 'Invalid credentials' });
        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, error: null });
      },

      addReward: (reward) => {
        const currentHistory = get().rewardsHistory || [];
        const newReward = {
          date: new Date().toISOString().split('T')[0],
          reward: reward,
          points: '-500' // Deduct 500 points per spin
        };
        
        // Update the user's guide data in the guides.json
        if (get().user) {
          const userName = get().user.username.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ');
          
          const guide = guidesData.guides.find(g => 
            g['name'].toLowerCase() === userName.toLowerCase()
          );
          
          if (guide) {
            // Update rewards
            if (guide.rewards) {
              guide.rewards += `, ${reward}`;
            } else {
              guide.rewards = reward;
            }
            
            // Deduct points
            const updatedPoints = Math.max(0, parseInt(guide.Points) - 500);
            guide.Points = updatedPoints.toString();
            
            console.log(`Updated guide data for ${guide.name}: Points=${guide.Points}, Rewards=${guide.rewards}`);
          }
        }
        
        set({
          rewardsHistory: [
            newReward,
            ...currentHistory
          ]
        });
        
        return newReward;
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated,
        rewardsHistory: state.rewardsHistory
      }),
    }
  )
);

export default useAuthStore;