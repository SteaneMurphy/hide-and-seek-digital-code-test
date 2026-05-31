import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShoppingCartPage from "@/app/cart/page";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

jest.mock("@/store/cart-store");
jest.mock("@/store/use-cart-hydrated", () => ({
  useCartHydrated: jest.fn(),
}));
import { useCartStore } from "@/store/cart-store";
import { useCartHydrated } from "@/store/use-cart-hydrated";

const mockHydrated = useCartHydrated as jest.Mock;

const mockBook = {
  id: 1,
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  price: 10.0,
  cover: "https://example.com/cover.jpg",
  description: "A classic novel.",
  isbn: "978-0743273565",
};

const mockBook2 = {
  id: 2,
  title: "1984",
  author: "George Orwell",
  price: 15.0,
  cover: "https://example.com/cover2.jpg",
  description: "A dystopian novel.",
  isbn: "978-0451524935",
};

const mockStore = (useCartStore as unknown as jest.Mock);

describe("ShoppingCartPage", () => {
  beforeEach(() => {
    mockHydrated.mockReturnValue(true);
  });

  it("shows the empty state message when the cart has no items", () => {
    mockStore.mockImplementation((selector) => selector({ items: [], removeItem: jest.fn() }));
    render(<ShoppingCartPage />);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it("renders the correct total across all items", () => {
    mockStore.mockImplementation((selector) =>
      selector({
        items: [
          { book: mockBook, quantity: 1 },
          { book: mockBook2, quantity: 1 },
        ],
        removeItem: jest.fn(),
      }),
    );
    render(<ShoppingCartPage />);
    expect(screen.getByText("$25.00")).toBeInTheDocument();
  });

  it("shows a per-row subtotal equal to price * quantity", () => {
    mockStore.mockImplementation((selector) =>
      selector({
        items: [
          { book: mockBook, quantity: 3 },
          { book: mockBook2, quantity: 1 },
        ],
        removeItem: jest.fn(),
      }),
    );
    render(<ShoppingCartPage />);
    expect(screen.getByText("$30.00")).toBeInTheDocument();
    expect(screen.getByText("$45.00")).toBeInTheDocument();
  });

  it("calls removeItem with the book id when Remove is clicked", async () => {
    const removeItem = jest.fn();
    mockStore.mockImplementation((selector) =>
      selector({ items: [{ book: mockBook, quantity: 1 }], removeItem }),
    );
    render(<ShoppingCartPage />);
    await userEvent.click(
      screen.getByRole("button", { name: /remove the great gatsby from cart/i }),
    );
    expect(removeItem).toHaveBeenCalledWith(mockBook.id);
  });

  it("calls incrementItem with the book id when the + button is clicked", async () => {
    const incrementItem = jest.fn();
    mockStore.mockImplementation((selector) =>
      selector({
        items: [{ book: mockBook, quantity: 1 }],
        removeItem: jest.fn(),
        incrementItem,
        decrementItem: jest.fn(),
      }),
    );
    render(<ShoppingCartPage />);
    await userEvent.click(
      screen.getByRole("button", { name: /increase quantity of the great gatsby/i }),
    );
    expect(incrementItem).toHaveBeenCalledWith(mockBook.id);
  });

  it("shows the empty state while the store is hydrating, even if items exist", () => {
    mockHydrated.mockReturnValue(false);
    mockStore.mockImplementation((selector) =>
      selector({ items: [{ book: mockBook, quantity: 1 }], removeItem: jest.fn() }),
    );
    render(<ShoppingCartPage />);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.queryByText(mockBook.title)).not.toBeInTheDocument();
  });
});
