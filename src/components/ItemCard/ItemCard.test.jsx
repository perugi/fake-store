import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import ItemCard from "./ItemCard";

const mockProduct = {
  id: 1,
  title: "Wireless Headphones",
  price: 79.99,
  image: "https://example.com/headphones.jpg",
  rating: {
    rate: 4.5,
    count: 230,
  },
};

const renderItemCard = (props = {}) => {
  const defaultProps = {
    product: mockProduct,
    addToCart: vi.fn(),
    onItemAdded: vi.fn(),
  };

  return render(
    <MemoryRouter>
      <ItemCard {...defaultProps} {...props} />
    </MemoryRouter>
  );
};

describe("ItemCard Component", () => {
  it("renders product information correctly", () => {
    renderItemCard();

    expect(
      screen.getByRole("heading", { name: mockProduct.title })
    ).toBeInTheDocument();
    expect(screen.getByText(`${mockProduct.price}€`)).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: mockProduct.title })
    ).toHaveAttribute("src", mockProduct.image);
  });

  it("creates correct details link with product id", () => {
    renderItemCard();

    const detailsLink = screen.getByRole("link", { name: /details/i });
    expect(detailsLink).toHaveAttribute(
      "href",
      `/shop/details/${mockProduct.id}`
    );
  });

  it("renders rating component with product rating data", () => {
    renderItemCard();

    expect(
      screen.getByLabelText("Rating: 4.5 out of 5 from 230 reviews")
    ).toBeInTheDocument();
  });

  it("passes addToCart callback to AddItem component", async () => {
    const user = userEvent.setup();
    const mockAddToCart = vi.fn();
    renderItemCard({ addToCart: mockAddToCart });

    const addButton = screen.getByRole("button", { name: /add to cart/i });
    await user.click(addButton);

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 1);
  });

  it("passes onItemAdded callback to AddItem component", async () => {
    const user = userEvent.setup();
    const mockOnItemAdded = vi.fn();
    renderItemCard({ onItemAdded: mockOnItemAdded });

    const addButton = screen.getByRole("button", { name: /add to cart/i });
    await user.click(addButton);

    expect(mockOnItemAdded).toHaveBeenCalledTimes(1);
  });
});
