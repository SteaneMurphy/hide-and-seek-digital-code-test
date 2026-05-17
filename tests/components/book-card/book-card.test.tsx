import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookCard from "@/components/book-card/book-card";
import type { Book } from "@/shared/books";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

const mockBook: Book = {
  id: 1,
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  price: 10.0,
  cover: "https://example.com/cover.jpg",
  description: "A classic novel.",
  isbn: "978-0743273565",
};

describe("BookCard", () => {
  it("renders the book title", () => {
    render(<BookCard book={mockBook} onAddToCart={() => {}} />);
    expect(screen.getByRole("heading", { name: /the great gatsby/i })).toBeInTheDocument();
  });

  it("renders the price formatted as $X.XX", () => {
    render(<BookCard book={mockBook} onAddToCart={() => {}} />);
    expect(screen.getByText("$10.00")).toBeInTheDocument();
  });

  it("calls onAddToCart with the book when the button is clicked", async () => {
    const onAddToCart = jest.fn();
    render(<BookCard book={mockBook} onAddToCart={onAddToCart} />);
    await userEvent.click(screen.getByRole("button", { name: /add the great gatsby to cart/i }));
    expect(onAddToCart).toHaveBeenCalledWith(mockBook);
  });
});
