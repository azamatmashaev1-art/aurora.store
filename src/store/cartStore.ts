import { create } from 'zustand';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  stock: number;
  images: string[];
  specs?: Record<string, string>;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (product, quantity = 1) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
          ),
        };
      }
      return { items: [...state.items, { ...product, quantity }] };
    });
  },
  removeItem: (productId) => {
    set((state) => ({ items: state.items.filter((i) => i.id !== productId) }));
  },
  updateQuantity: (productId, quantity) => {
    set((state) => ({
      items: state.items.map((i) =>
        i.id === productId ? { ...i, quantity: Math.max(1, quantity) } : i
      ),
    }));
  },
  clearCart: () => set({ items: [] }),
  cartTotal: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
  cartCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },
}));
