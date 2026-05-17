import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders the BookHaven heading", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /bookhaven/i }),
    ).toBeInTheDocument();
  });
});
