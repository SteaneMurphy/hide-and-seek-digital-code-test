import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

jest.mock("@/server/repositories/books-repository", () => ({
  listAllBooks: jest.fn().mockResolvedValue([]),
}));

describe("HomePage", () => {
  it("renders the BookHaven heading", async () => {
    render(await HomePage());
    expect(
      screen.getByRole("heading", { level: 1, name: /bookhaven/i }),
    ).toBeInTheDocument();
  });
});
