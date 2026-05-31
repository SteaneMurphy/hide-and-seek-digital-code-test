import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Book } from "@/shared/books";
import { MAX_QUANTITY } from "@/constants/cart";

export type CartItem = {
  book: Book;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (book: Book) => void;
  removeItem: (bookId: number) => void;
  incrementItem: (bookId: number) => void;
  decrementItem: (bookId: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (book) =>
        set((state) => {
          const existing = state.items.find((i) => i.book.id === book.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.book.id === book.id
                  ? { ...i, quantity: Math.min(i.quantity + 1, MAX_QUANTITY) }
                  : i,
              ),
            };
          }
          return { items: [...state.items, { book, quantity: 1 }] };
        }),

      removeItem: (bookId) =>
        set((state) => ({
          items: state.items.filter((i) => i.book.id !== bookId),
        })),

      incrementItem: (bookId) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.book.id === bookId
              ? { ...i, quantity: Math.min(i.quantity + 1, MAX_QUANTITY) }
              : i,
          ),
        })),

      decrementItem: (bookId) =>
        set((state) => {
          const existing = state.items.find((i) => i.book.id === bookId);
          if (!existing) return state;
          if (existing.quantity <= 1) {
            return { items: state.items.filter((i) => i.book.id !== bookId) };
          }
          return {
            items: state.items.map((i) =>
              i.book.id === bookId ? { ...i, quantity: i.quantity - 1 } : i,
            ),
          };
        }),

      clearCart: () => set({ items: [] }),
    }),
    { name: "bookhaven-cart" },
  ),
);
