import { create } from 'zustand';

export type Language = 'RU' | 'EN';

interface LangStore {
  lang: Language;
  setLang: (lang: Language) => void;
}

export const useLangStore = create<LangStore>((set) => ({
  lang: 'RU',
  setLang: (lang) => set({ lang }),
}));
