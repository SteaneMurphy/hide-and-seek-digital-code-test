import { render, screen } from "@testing-library/react";
import CartPage from "@/app/cart/page";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

jest.mock("@/store/cart-store");
import { useCartStore } from "@/store/cart-store";

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

describe("CartPage", () => {
  it("shows the empty state message when the cart has no items", () => {
    mockStore.mockReturnValue({ items: [], removeItem: jest.fn() });
    render(<CartPage />);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it("shows a 'Continue shopping' link to / in the empty state", () => {
    mockStore.mockReturnValue({ items: [], removeItem: jest.fn() });
    render(<CartPage />);
    expect(screen.getByRole("link", { name: /continue shopping/i })).toHaveAttribute("href", "/");
  });

  it("renders item titles when the cart has items", () => {
    mockStore.mockReturnValue({
      items: [{ book: mockBook, quantity: 1 }],
      removeItem: jest.fn(),
    });
    render(<CartPage />);
    expect(screen.getByText("The Great Gatsby")).toBeInTheDocument();
  });

  it("renders the correct total across all items", () => {
    mockStore.mockReturnValue({
      items: [
        { book: mockBook, quantity: 1 },
        { book: mockBook2, quantity: 1 },
      ],
      removeItem: jest.fn(),
    });
    render(<CartPage />);
    expect(screen.getByText("$25.00")).toBeInTheDocument();
  });
});
