import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import users from '../data/users.json';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      error: null,
      rewardsHistory: [],

      login: (username, password) => {
        const user = users.users.find(
          (u) => u.username === username && u.password === password
        );

        if (user) {
          set({ user, isAuthenticated: true, error: null });
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
        set({
          rewardsHistory: [
            {
              date: new Date().toISOString().split('T')[0],
              reward: reward,
              points: '+' + Math.floor(Math.random() * 500 + 100)
            },
            ...currentHistory
          ]
        });
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