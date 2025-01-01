"use client";
import { create } from "zustand";

import createSelectors from "./createSelectors";

interface ThemeState {
  dim: boolean;
  setDim: (newDim: boolean) => void;
}

const useTheme = create<ThemeState>()((set) => ({
  dim: false,
  setDim: (newDim) => set({ dim: newDim }),
}));

export default createSelectors(useTheme);
