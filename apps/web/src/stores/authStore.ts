import { create } from "zustand";
interface AuthStore {
  isAuthenticate: boolean;
  token: string | null;
  userName: string | null;
  id: string | null;
  setIsAuthenticate: (isAuthenticate: boolean) => void;
  setToken: (token: string, id: string, userName: string) => void;
}
// define zustand store to store user authentication data
export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticate: false, // authenticate state
  token: null, //store access token
  id: null, // store user id
  userName: null, // store user username
  setIsAuthenticate: (isAuthenticate) => set({ isAuthenticate }), // function to set the authentication state
  setToken: (
    token,
    id,
    userName // function to set the token, id, and name
  ) => set({ token, userName, id }),
}));
