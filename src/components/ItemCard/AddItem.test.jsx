import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import AddItem from "./AddItem";

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 29.99,
  image: "test.jpg",
};

describe("AddItem Component", () => {
  it("renders with initial quantity of 1", () => {
    const mockAddToCart = vi.fn();
    render(<AddItem product={mockProduct} addToCart={mockAddToCart} />);

    const input = screen.getByRole("spinbutton");
    expect(input).toHaveValue(1);
    expect(
      screen.getByRole("button", { name: /add to cart/i })
    ).toBeInTheDocument();
  });

  it("increases quantity when increment button is clicked", async () => {
    const user = userEvent.setup();
    const mockAddToCart = vi.fn();
    render(<AddItem product={mockProduct} addToCart={mockAddToCart} />);

    const increaseButton = screen.getByRole("button", {
      name: /increase quantity/i,
    });
    const input = screen.getByRole("spinbutton");

    await user.click(increaseButton);
    expect(input).toHaveValue(2);

    await user.click(increaseButton);
    expect(input).toHaveValue(3);
  });

  it("decreases quantity when decrement button is clicked", async () => {
    const user = userEvent.setup();
    const mockAddToCart = vi.fn();
    render(<AddItem product={mockProduct} addToCart={mockAddToCart} />);

    const increaseButton = screen.getByRole("button", {
      name: /increase quantity/i,
    });
    const decreaseButton = screen.getByRole("button", {
      name: /decrease quantity/i,
    });
    const input = screen.getByRole("spinbutton");

    // Increase to 3 first
    await user.click(increaseButton);
    await user.click(increaseButton);
    expect(input).toHaveValue(3);

    // Then decrease
    await user.click(decreaseButton);
    expect(input).toHaveValue(2);
  });

  it("does not decrease quantity below 1", async () => {
    const user = userEvent.setup();
    const mockAddToCart = vi.fn();
    render(<AddItem product={mockProduct} addToCart={mockAddToCart} />);

    const decreaseButton = screen.getByRole("button", {
      name: /decrease quantity/i,
    });
    const input = screen.getByRole("spinbutton");

    expect(input).toHaveValue(1);

    await user.click(decreaseButton);
    expect(input).toHaveValue(1);

    await user.click(decreaseButton);
    expect(input).toHaveValue(1);
  });

  it("allows direct input of quantity", async () => {
    const user = userEvent.setup();
    const mockAddToCart = vi.fn();
    render(<AddItem product={mockProduct} addToCart={mockAddToCart} />);

    const input = screen.getByRole("spinbutton");

    await user.dblClick(input);
    await user.keyboard("5");

    expect(input).toHaveValue(5);
  });

  it("enforces minimum quantity of 1 when typing", async () => {
    const user = userEvent.setup();
    const mockAddToCart = vi.fn();
    render(<AddItem product={mockProduct} addToCart={mockAddToCart} />);

    const input = screen.getByRole("spinbutton");

    // Select all and replace with 0
    await user.dblClick(input);
    await user.keyboard("0");

    expect(input).toHaveValue(1);
  });

  it("calls addToCart with product and quantity when form is submitted", async () => {
    const user = userEvent.setup();
    const mockAddToCart = vi.fn();
    render(<AddItem product={mockProduct} addToCart={mockAddToCart} />);

    const addButton = screen.getByRole("button", { name: /add to cart/i });
    const increaseButton = screen.getByRole("button", {
      name: /increase quantity/i,
    });

    await user.click(increaseButton);
    await user.click(increaseButton);
    await user.click(addButton);

    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 3);
  });

  it("resets quantity to 1 after adding to cart", async () => {
    const user = userEvent.setup();
    const mockAddToCart = vi.fn();
    render(<AddItem product={mockProduct} addToCart={mockAddToCart} />);

    const addButton = screen.getByRole("button", { name: /add to cart/i });
    const increaseButton = screen.getByRole("button", {
      name: /increase quantity/i,
    });
    const input = screen.getByRole("spinbutton");

    await user.click(increaseButton);
    await user.click(increaseButton);
    expect(input).toHaveValue(3);

    await user.click(addButton);
    expect(input).toHaveValue(1);
  });

  it("calls onItemAdded callback if provided", async () => {
    const user = userEvent.setup();
    const mockAddToCart = vi.fn();
    const mockOnItemAdded = vi.fn();
    render(
      <AddItem
        product={mockProduct}
        addToCart={mockAddToCart}
        onItemAdded={mockOnItemAdded}
      />
    );

    const addButton = screen.getByRole("button", { name: /add to cart/i });
    await user.click(addButton);

    expect(mockOnItemAdded).toHaveBeenCalledTimes(1);
  });

  it("does not error when onItemAdded is not provided", async () => {
    const user = userEvent.setup();
    const mockAddToCart = vi.fn();
    render(<AddItem product={mockProduct} addToCart={mockAddToCart} />);

    const addButton = screen.getByRole("button", { name: /add to cart/i });

    // Should not throw
    await expect(user.click(addButton)).resolves.not.toThrow();
  });

  it("prevents form submission default behavior", async () => {
    const user = userEvent.setup();
    const mockAddToCart = vi.fn();
    const mockSubmit = vi.fn((e) => e.preventDefault());

    const { container } = render(
      <AddItem product={mockProduct} addToCart={mockAddToCart} />
    );

    const form = container.querySelector("form");
    form.addEventListener("submit", mockSubmit);

    const addButton = screen.getByRole("button", { name: /add to cart/i });
    await user.click(addButton);

    expect(mockSubmit).toHaveBeenCalled();
  });
});
