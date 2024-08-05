import { create } from "zustand";

type State = {
  theme: "dark" | "light";
};

type Action = {
  updateTheme: (theme: State["theme"]) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useUiStore = create<State & Action>((set) => ({
  theme: "light",
  updateTheme: (theme) => set(() => ({ theme })),
}));
