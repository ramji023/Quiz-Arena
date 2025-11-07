import { create } from "zustand";
interface AuthStore {
    isAuthenticate : boolean;
    token : string |null;
    userName : string | null;
    id : string |null;
    setIsAuthenticate : (isAuthenticate:boolean)=>void;
    setToken : (token:string,id:string,userName:string)=>void;
}
export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticate: false,
  token: null,
  id :null,
  userName: null,
  setIsAuthenticate: (isAuthenticate) => set({ isAuthenticate }),
  setToken: (token, id, userName) =>
    set({ token, userName, id }),
}));
