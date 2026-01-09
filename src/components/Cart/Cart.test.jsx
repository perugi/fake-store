import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Cart from "./Cart";

const mockShoppingCart = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: 79.99,
    image: "https://example.com/headphones.jpg",
    quantity: 2,
  },
  {
    id: 2,
    title: "Smart Watch",
    price: 199.99,
    image: "https://example.com/watch.jpg",
    quantity: 1,
  },
];

const renderCart = (props = {}) => {
  const defaultProps = {
    isOpen: false,
    onClose: vi.fn(),
    shoppingCart: [],
    setItemQuantity: vi.fn(),
    removeFromCart: vi.fn(),
    handleCheckout: vi.fn(),
    total: "0.00€",
  };

  return render(
    <BrowserRouter>
      <Cart {...defaultProps} {...props} />
    </BrowserRouter>
  );
};

describe("Cart Component", () => {
  beforeEach(() => {
    // Mock the HTMLDialogElement methods to set the open attribute
    HTMLDialogElement.prototype.showModal = vi.fn(function () {
      this.setAttribute("open", "");
    });
    HTMLDialogElement.prototype.close = vi.fn(function () {
      this.removeAttribute("open");
    });
  });

  describe("Dialog behavior", () => {
    it("calls showModal when isOpen is true", () => {
      renderCart({ isOpen: true });
      expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    });

    it("calls close when isOpen changes to false", () => {
      const { rerender } = renderCart({ isOpen: true });

      rerender(
        <BrowserRouter>
          <Cart
            isOpen={false}
            onClose={vi.fn()}
            shoppingCart={[]}
            setItemQuantity={vi.fn()}
            removeFromCart={vi.fn()}
            handleCheckout={vi.fn()}
            total="0.00€"
          />
        </BrowserRouter>
      );

      expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
    });

    it("calls onClose when close button is clicked", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      renderCart({ onClose, isOpen: true });

      const closeButton = screen.getByRole("button", { name: /close/i });
      await user.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("calls onClose when dialog closes", () => {
      const onClose = vi.fn();
      const { container } = renderCart({ onClose, isOpen: true });

      const dialog = container.querySelector("dialog");
      dialog.dispatchEvent(new Event("close"));

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("Empty cart state", () => {
    it("displays empty cart message when cart is empty", () => {
      renderCart({ shoppingCart: [], isOpen: true });

      expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Looks like you haven't added anything to your cart yet."
        )
      ).toBeInTheDocument();
    });

    it("shows 'Start Shopping' button and calls onClose when clicked", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      renderCart({ shoppingCart: [], onClose, isOpen: true });

      const startShoppingButton = screen.getByRole("button", {
        name: /start shopping/i,
      });
      expect(startShoppingButton).toBeInTheDocument();

      await user.click(startShoppingButton);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("Cart with items", () => {
    it("renders all items and displays total price", () => {
      renderCart({
        shoppingCart: mockShoppingCart,
        total: "359.97€",
        isOpen: true,
      });

      expect(
        screen.getByRole("heading", { name: "Wireless Headphones" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Smart Watch" })
      ).toBeInTheDocument();

      const itemImages = screen.getAllByRole("img");
      expect(itemImages).toHaveLength(mockShoppingCart.length);

      expect(screen.getByText("Total:")).toBeInTheDocument();
      expect(screen.getByText("359.97€")).toBeInTheDocument();
    });

    it("calls handleCheckout when 'Checkout' button is clicked", async () => {
      const user = userEvent.setup();
      const handleCheckout = vi.fn();
      renderCart({
        shoppingCart: mockShoppingCart,
        handleCheckout,
        isOpen: true,
      });

      const checkoutButton = screen.getByRole("button", { name: /checkout/i });
      await user.click(checkoutButton);

      expect(handleCheckout).toHaveBeenCalledTimes(1);
    });

    it("calls onClose when 'Continue Shopping' button is clicked", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      renderCart({ shoppingCart: mockShoppingCart, onClose, isOpen: true });

      const continueShoppingButton = screen.getByRole("button", {
        name: /continue shopping/i,
      });
      await user.click(continueShoppingButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
