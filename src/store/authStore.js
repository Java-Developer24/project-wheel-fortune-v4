import { create } from 'zustand';
import users from '../data/users.json';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,

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
}));

export default useAuthStore;