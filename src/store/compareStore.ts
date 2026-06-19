import { create } from 'zustand';
import { Product } from './cartStore';

interface CompareStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
}

export const useCompareStore = create<CompareStore>((set, get) => ({
  items: [],
  addItem: (product) => {
    set((state) => {
      // Allow maximum 2 items to be compared
      if (state.items.length >= 2) return state;
      if (!state.items.find((i) => i.id === product.id)) {
        return { items: [...state.items, product] };
      }
      return state;
    });
  },
  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== productId),
    }));
  },
  clearCompare: () => set({ items: [] }),
  isInCompare: (productId) => {
    return get().items.some((i) => i.id === productId);
  },
}));
