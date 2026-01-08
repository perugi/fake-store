import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Header from "./Header";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderHeader = (props = {}) => {
  const defaultProps = {
    itemCount: 0,
    onOpenCart: vi.fn(),
  };

  return render(
    <MemoryRouter>
      <Header {...defaultProps} {...props} />
    </MemoryRouter>
  );
};

describe("Header Component", () => {
  it("renders logo link to home", () => {
    renderHeader();

    const logoLink = screen.getByRole("link", { name: /fakestore/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("renders shop link", () => {
    renderHeader();

    const shopLink = screen.getByRole("link", { name: /shop/i });
    expect(shopLink).toBeInTheDocument();
    expect(shopLink).toHaveAttribute("href", "/shop");
  });

  it("renders search input", () => {
    renderHeader();

    const searchInput = screen.getByRole("textbox", {
      name: /search products/i,
    });
    expect(searchInput).toBeInTheDocument();
  });

  it("renders search button", () => {
    renderHeader();

    const searchButton = screen.getByRole("button", { name: /^search$/i });
    expect(searchButton).toBeInTheDocument();
  });

  it("renders cart button", () => {
    renderHeader();

    const cartButton = screen.getByRole("button", { name: /shopping cart/i });
    expect(cartButton).toBeInTheDocument();
  });

  it("does not show item count when itemCount is 0", () => {
    renderHeader({ itemCount: 0 });

    const cartButton = screen.getByRole("button", { name: /shopping cart/i });
    expect(cartButton).toHaveTextContent("Cart");
    expect(cartButton).not.toHaveTextContent(/\d+/);
  });

  it("shows item count when itemCount is greater than 0", () => {
    renderHeader({ itemCount: 1 });

    const cartButton = screen.getByRole("button", { name: /shopping cart/i });
    expect(cartButton).toHaveTextContent("1");
  });

  it("updates item count display", () => {
    const { rerender } = render(
      <MemoryRouter>
        <Header itemCount={3} onOpenCart={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText("3")).toBeInTheDocument();

    rerender(
      <MemoryRouter>
        <Header itemCount={7} onOpenCart={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText("7")).toBeInTheDocument();
  });

  it("calls onOpenCart when cart button is clicked", async () => {
    const user = userEvent.setup();
    const mockOnOpenCart = vi.fn();
    renderHeader({ onOpenCart: mockOnOpenCart });

    const cartButton = screen.getByRole("button", { name: /shopping cart/i });
    await user.click(cartButton);

    expect(mockOnOpenCart).toHaveBeenCalledTimes(1);
  });

  it("navigates to shop with search query when form is submitted", async () => {
    const user = userEvent.setup();
    renderHeader();

    const searchInput = screen.getByRole("textbox", {
      name: /search products/i,
    });
    const searchButton = screen.getByRole("button", { name: /^search$/i });

    await user.type(searchInput, "headphones");
    await user.click(searchButton);

    expect(mockNavigate).toHaveBeenCalledWith("/shop?q=headphones");
    expect(searchInput).toHaveValue("");
  });

  it("handles search with empty query", async () => {
    const user = userEvent.setup();
    renderHeader();

    const searchButton = screen.getByRole("button", { name: /^search$/i });
    await user.click(searchButton);

    expect(mockNavigate).toHaveBeenCalledWith("/shop?q=");
  });

  it("handles search submission via Enter key", async () => {
    const user = userEvent.setup();
    renderHeader();

    const searchInput = screen.getByRole("textbox", {
      name: /search products/i,
    });

    await user.type(searchInput, "mouse");
    await user.keyboard("{Enter}");

    expect(mockNavigate).toHaveBeenCalledWith("/shop?q=mouse");
  });

  it("item count badge is hidden from screen readers", () => {
    renderHeader({ itemCount: 3 });

    const badge = screen.getByText("3");
    expect(badge).toHaveAttribute("aria-hidden", "true");
  });
});
