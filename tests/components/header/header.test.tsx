import { render, screen } from "@testing-library/react";
import Header from "@/components/header/header";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

jest.mock("@/store/cart-store");
jest.mock("@/store/use-cart-hydrated", () => ({
  useCartHydrated: () => true,
}));
import { useCartStore } from "@/store/cart-store";

describe("Header", () => {
const mockStore = (useCartStore as unknown as jest.Mock);

  it("renders the BookHaven brand name", () => {
    mockStore.mockImplementation((selector) => selector({ items: [] }));
    render(<Header />);
    expect(screen.getByText("BookHaven")).toBeInTheDocument();
  });

  it("does not show a badge when the cart is empty", () => {
    mockStore.mockImplementation((selector) => selector({ items: [] }));
    render(<Header />);
    expect(screen.queryByText(/^\d+$/)).not.toBeInTheDocument();
  });

  it("shows a badge with the total item count when the cart has items", () => {
    mockStore.mockImplementation((selector) =>
      selector({ items: [{ book: { id: 1 }, quantity: 3 }, { book: { id: 2 }, quantity: 2 }] }),
    );
    render(<Header />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
