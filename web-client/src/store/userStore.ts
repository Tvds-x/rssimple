import { create } from "zustand";

type State = {
  token: string;
  isAuth: boolean;
};

type Action = {
  updateToken: (token: State["token"]) => void;
  updateIsAuth: (isAuth: State["isAuth"]) => void;
};

export const useUserStore = create<State & Action>((set) => ({
  token: "",
  isAuth: false,
  updateToken: (token) => set(() => ({ token })),
  updateIsAuth: (isAuth) => set(() => ({ isAuth })),
}));
