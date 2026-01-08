import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import ItemCardCart from "./ItemCardCart";

const mockItem = {
  id: 1,
  title: "Wireless Headphones",
  price: 79.99,
  image: "https://example.com/headphones.jpg",
  quantity: 2,
};

const renderItemCardCart = (props = {}) => {
  const defaultProps = {
    item: mockItem,
    setItemQuantity: vi.fn(),
    removeFromCart: vi.fn(),
  };

  return render(<ItemCardCart {...defaultProps} {...props} />);
};

describe("ItemCardCart Component", () => {
  it("renders item information correctly", () => {
    renderItemCardCart();

    expect(
      screen.getByRole("heading", { name: mockItem.title })
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: mockItem.title })).toHaveAttribute(
      "src",
      mockItem.image
    );
  });

  it("calculates and displays item total correctly", () => {
    renderItemCardCart();

    const expectedTotal = (mockItem.price * mockItem.quantity).toFixed(2);
    expect(screen.getByText(`${expectedTotal}€`)).toBeInTheDocument();
  });

  it("updates item total when quantity changes", () => {
    const item = { ...mockItem, quantity: 3 };
    renderItemCardCart({ item });

    const expectedTotal = (mockItem.price * 3).toFixed(2);
    expect(screen.getByText(`${expectedTotal}€`)).toBeInTheDocument();
  });

  it("renders quantity controls with current quantity", () => {
    renderItemCardCart();

    const quantityInput = screen.getByRole("spinbutton");
    expect(quantityInput).toHaveValue(mockItem.quantity);
  });

  it("calls setItemQuantity with incremented quantity when increase button is clicked", async () => {
    const user = userEvent.setup();
    const mockSetItemQuantity = vi.fn();
    renderItemCardCart({ setItemQuantity: mockSetItemQuantity });

    const increaseButton = screen.getByRole("button", {
      name: /increase quantity/i,
    });
    await user.click(increaseButton);

    expect(mockSetItemQuantity).toHaveBeenCalledWith(mockItem.id, 3);
  });

  it("calls setItemQuantity with decremented quantity when decrease button is clicked", async () => {
    const user = userEvent.setup();
    const mockSetItemQuantity = vi.fn();
    renderItemCardCart({ setItemQuantity: mockSetItemQuantity });

    const decreaseButton = screen.getByRole("button", {
      name: /decrease quantity/i,
    });
    await user.click(decreaseButton);

    expect(mockSetItemQuantity).toHaveBeenCalledWith(mockItem.id, 1);
  });

  it("does not decrease quantity below 1", async () => {
    const user = userEvent.setup();
    const mockSetItemQuantity = vi.fn();
    const item = { ...mockItem, quantity: 1 };
    renderItemCardCart({ item, setItemQuantity: mockSetItemQuantity });

    const decreaseButton = screen.getByRole("button", {
      name: /decrease quantity/i,
    });
    await user.click(decreaseButton);

    expect(mockSetItemQuantity).toHaveBeenCalledWith(mockItem.id, 1);
  });

  it("calls setItemQuantity when quantity is changed via input", async () => {
    const user = userEvent.setup();
    const mockSetItemQuantity = vi.fn();
    renderItemCardCart({ setItemQuantity: mockSetItemQuantity });

    const quantityInput = screen.getByRole("spinbutton");

    await user.dblClick(quantityInput);
    await user.keyboard("5");

    expect(mockSetItemQuantity).toHaveBeenCalledWith(mockItem.id, 5);
  });

  it("enforces minimum quantity of 1 when typing in input", async () => {
    const user = userEvent.setup();
    const mockSetItemQuantity = vi.fn();
    renderItemCardCart({ setItemQuantity: mockSetItemQuantity });

    const quantityInput = screen.getByRole("spinbutton");

    await user.dblClick(quantityInput);
    await user.keyboard("0");

    expect(mockSetItemQuantity).toHaveBeenCalledWith(mockItem.id, 1);
  });

  it("renders remove button", () => {
    renderItemCardCart();

    const removeButton = screen.getByRole("button", { name: /x/i });
    expect(removeButton).toBeInTheDocument();
  });

  it("calls removeFromCart with item id when remove button is clicked", async () => {
    const user = userEvent.setup();
    const mockRemoveFromCart = vi.fn();
    renderItemCardCart({ removeFromCart: mockRemoveFromCart });

    const removeButton = screen.getByRole("button", { name: /x/i });
    await user.click(removeButton);

    expect(mockRemoveFromCart).toHaveBeenCalledTimes(1);
    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockItem.id);
  });

  it("formats price to 2 decimal places", () => {
    const item = { ...mockItem, price: 99.9, quantity: 1 };
    renderItemCardCart({ item });

    expect(screen.getByText("99.90€")).toBeInTheDocument();
  });
});
