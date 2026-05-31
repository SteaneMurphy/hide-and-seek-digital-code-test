import { useCartStore } from "@/store/cart-store";
import { MAX_QUANTITY } from "@/constants/cart";
import type { Book } from "@/shared/books";

const bookA: Book = {
  id: 1,
  title: "Book A",
  author: "Author A",
  price: 10,
  cover: "",
  description: "",
  isbn: "isbn-a",
};

const bookB: Book = {
  id: 2,
  title: "Book B",
  author: "Author B",
  price: 20,
  cover: "",
  description: "",
  isbn: "isbn-b",
};

describe("cart store", () => {
  it("supports the full add / dedupe / cap / increment / decrement / remove / clear lifecycle", () => {
    const { getState } = useCartStore;

    getState().clearCart();
    expect(getState().items).toEqual([]);

    getState().addItem(bookA);
    expect(getState().items).toEqual([{ book: bookA, quantity: 1 }]);

    getState().addItem(bookA);
    expect(getState().items).toHaveLength(1);
    expect(getState().items[0].quantity).toBe(2);

    getState().addItem(bookB);
    expect(getState().items).toHaveLength(2);
    expect(getState().items[1]).toEqual({ book: bookB, quantity: 1 });

    for (let i = 0; i < MAX_QUANTITY + 5; i++) {
      getState().addItem(bookA);
    }
    expect(getState().items[0].quantity).toBe(MAX_QUANTITY);

    getState().incrementItem(bookA.id);
    expect(getState().items[0].quantity).toBe(MAX_QUANTITY);

    getState().decrementItem(bookA.id);
    expect(getState().items[0].quantity).toBe(MAX_QUANTITY - 1);

    getState().decrementItem(bookB.id);
    expect(getState().items[1].quantity).toBe(1);

    getState().removeItem(bookA.id);
    expect(getState().items).toEqual([{ book: bookB, quantity: 1 }]);

    getState().clearCart();
    expect(getState().items).toEqual([]);
  });
});
