import { describe, it, expect, beforeEach } from "vitest";
import ShoppingCart from "./ShoppingCart";

describe("ShoppingCart", () => {
  let cart;
  let mockProduct1;
  let mockProduct2;
  let mockProduct3;

  beforeEach(() => {
    cart = new ShoppingCart();
    mockProduct1 = {
      id: 1,
      title: "Product A",
      price: 10.99,
      description: "Test product 1",
    };
    mockProduct2 = {
      id: 2,
      title: "Product B",
      price: 25.5,
      description: "Test product 2",
    };
    mockProduct3 = {
      id: 3,
      title: "Product C",
      price: 5.0,
      description: "Test product 3",
    };
  });

  describe("constructor", () => {
    it("should create an empty cart when no items are provided", () => {
      const emptyCart = new ShoppingCart();
      expect(emptyCart.toArray()).toEqual([]);
    });

    it("should create a cart with initial items", () => {
      const items = [{ ...mockProduct1, quantity: 2 }];
      const cartWithItems = new ShoppingCart(items);
      expect(cartWithItems.toArray()).toEqual(items);
    });
  });

  describe("addItem", () => {
    it("should add a new item to an empty cart", () => {
      const newCart = cart.addItem(mockProduct1, 1);
      expect(newCart.toArray()).toHaveLength(1);
      expect(newCart.toArray()[0]).toMatchObject({
        ...mockProduct1,
        quantity: 1,
      });
    });

    it("should add multiple quantities of an item", () => {
      const newCart = cart.addItem(mockProduct1, 3);
      expect(newCart.toArray()[0].quantity).toBe(3);
    });

    it("should increase quantity when adding an existing item", () => {
      let newCart = cart.addItem(mockProduct1, 2);
      newCart = newCart.addItem(mockProduct1, 3);
      expect(newCart.toArray()).toHaveLength(1);
      expect(newCart.toArray()[0].quantity).toBe(5);
    });

    it("should return a new ShoppingCart instance (immutability)", () => {
      const newCart = cart.addItem(mockProduct1, 1);
      expect(newCart).not.toBe(cart);
      expect(cart.toArray()).toHaveLength(0);
      expect(newCart.toArray()).toHaveLength(1);
    });

    it("should add multiple different items", () => {
      let newCart = cart.addItem(mockProduct1, 1);
      newCart = newCart.addItem(mockProduct2, 2);
      expect(newCart.toArray()).toHaveLength(2);
    });

    it("should sort items alphabetically by title when adding to existing item", () => {
      let newCart = cart.addItem(mockProduct2, 1); // Product B
      newCart = newCart.addItem(mockProduct1, 1); // Product A
      newCart = newCart.addItem(mockProduct2, 1); // Add more Product B
      const items = newCart.toArray();
      expect(items[0].title).toBe("Product A");
      expect(items[1].title).toBe("Product B");
      expect(items[1].quantity).toBe(2);
    });
  });

  describe("updateQuantity", () => {
    it("should update the quantity of an existing item", () => {
      let newCart = cart.addItem(mockProduct1, 2);
      newCart = newCart.updateQuantity(mockProduct1.id, 5);
      expect(newCart.toArray()[0].quantity).toBe(5);
    });

    it("should update only the specified item", () => {
      let newCart = cart.addItem(mockProduct1, 2);
      newCart = newCart.addItem(mockProduct2, 3);
      newCart = newCart.updateQuantity(mockProduct1.id, 10);
      expect(newCart.toArray()[0].quantity).toBe(10);
      expect(newCart.toArray()[1].quantity).toBe(3);
    });

    it("should return a new ShoppingCart instance (immutability)", () => {
      const cartWithItem = cart.addItem(mockProduct1, 2);
      const updatedCart = cartWithItem.updateQuantity(mockProduct1.id, 5);
      expect(updatedCart).not.toBe(cartWithItem);
      expect(cartWithItem.toArray()[0].quantity).toBe(2);
      expect(updatedCart.toArray()[0].quantity).toBe(5);
    });

    it("should not modify cart when updating non-existent item", () => {
      const cartWithItem = cart.addItem(mockProduct1, 2);
      const updatedCart = cartWithItem.updateQuantity(999, 10);
      expect(updatedCart.toArray()).toEqual(cartWithItem.toArray());
    });
  });

  describe("removeItem", () => {
    it("should remove an item from the cart", () => {
      let newCart = cart.addItem(mockProduct1, 2);
      newCart = newCart.removeItem(mockProduct1.id);
      expect(newCart.toArray()).toHaveLength(0);
    });

    it("should remove only the specified item", () => {
      let newCart = cart.addItem(mockProduct1, 1);
      newCart = newCart.addItem(mockProduct2, 2);
      newCart = newCart.addItem(mockProduct3, 3);
      newCart = newCart.removeItem(mockProduct2.id);
      expect(newCart.toArray()).toHaveLength(2);
      expect(
        newCart.toArray().find((item) => item.id === mockProduct2.id)
      ).toBeUndefined();
      expect(
        newCart.toArray().find((item) => item.id === mockProduct1.id)
      ).toBeDefined();
      expect(
        newCart.toArray().find((item) => item.id === mockProduct3.id)
      ).toBeDefined();
    });

    it("should return a new ShoppingCart instance (immutability)", () => {
      const cartWithItem = cart.addItem(mockProduct1, 2);
      const updatedCart = cartWithItem.removeItem(mockProduct1.id);
      expect(updatedCart).not.toBe(cartWithItem);
      expect(cartWithItem.toArray()).toHaveLength(1);
      expect(updatedCart.toArray()).toHaveLength(0);
    });

    it("should not modify cart when removing non-existent item", () => {
      const cartWithItem = cart.addItem(mockProduct1, 2);
      const updatedCart = cartWithItem.removeItem(999);
      expect(updatedCart.toArray()).toEqual(cartWithItem.toArray());
    });
  });

  describe("clear", () => {
    it("should remove all items from the cart", () => {
      let newCart = cart.addItem(mockProduct1, 1);
      newCart = newCart.addItem(mockProduct2, 2);
      newCart = newCart.clear();
      expect(newCart.toArray()).toHaveLength(0);
    });

    it("should return a new ShoppingCart instance (immutability)", () => {
      const cartWithItems = cart.addItem(mockProduct1, 2);
      const clearedCart = cartWithItems.clear();
      expect(clearedCart).not.toBe(cartWithItems);
      expect(cartWithItems.toArray()).toHaveLength(1);
      expect(clearedCart.toArray()).toHaveLength(0);
    });

    it("should work on an already empty cart", () => {
      const clearedCart = cart.clear();
      expect(clearedCart.toArray()).toHaveLength(0);
    });
  });

  describe("getTotal", () => {
    it('should return "0.00" for an empty cart', () => {
      expect(cart.getTotal()).toBe("0.00");
    });

    it("should calculate the total for a single item", () => {
      const newCart = cart.addItem(mockProduct1, 2);
      expect(newCart.getTotal()).toBe("21.98");
    });

    it("should calculate the total for multiple items", () => {
      let newCart = cart.addItem(mockProduct1, 2); // 2 * 10.99 = 21.98
      newCart = newCart.addItem(mockProduct2, 1); // 1 * 25.50 = 25.50
      newCart = newCart.addItem(mockProduct3, 3); // 3 * 5.00 = 15.00
      // Total: 62.48
      expect(newCart.getTotal()).toBe("62.48");
    });

    it("should return total as a string with two decimal places", () => {
      const newCart = cart.addItem(mockProduct3, 1); // 5.00
      expect(newCart.getTotal()).toBe("5.00");
    });

    it("should handle decimal calculations correctly", () => {
      const product = { id: 4, title: "Product D", price: 0.99 };
      const newCart = cart.addItem(product, 3);
      expect(newCart.getTotal()).toBe("2.97");
    });
  });

  describe("getItemCount", () => {
    it("should return 0 for an empty cart", () => {
      expect(cart.getItemCount()).toBe(0);
    });

    it("should return the total quantity of a single item", () => {
      const newCart = cart.addItem(mockProduct1, 5);
      expect(newCart.getItemCount()).toBe(5);
    });

    it("should return the sum of quantities for multiple items", () => {
      let newCart = cart.addItem(mockProduct1, 2);
      newCart = newCart.addItem(mockProduct2, 3);
      newCart = newCart.addItem(mockProduct3, 1);
      expect(newCart.getItemCount()).toBe(6);
    });

    it("should update after modifying quantities", () => {
      let newCart = cart.addItem(mockProduct1, 5);
      expect(newCart.getItemCount()).toBe(5);
      newCart = newCart.updateQuantity(mockProduct1.id, 10);
      expect(newCart.getItemCount()).toBe(10);
    });
  });

  describe("toArray", () => {
    it("should return an empty array for an empty cart", () => {
      expect(cart.toArray()).toEqual([]);
    });

    it("should return an array of items", () => {
      let newCart = cart.addItem(mockProduct1, 1);
      newCart = newCart.addItem(mockProduct2, 2);
      const items = newCart.toArray();
      expect(Array.isArray(items)).toBe(true);
      expect(items).toHaveLength(2);
    });

    it("should return items with all properties", () => {
      const newCart = cart.addItem(mockProduct1, 3);
      const items = newCart.toArray();
      expect(items[0]).toMatchObject({
        id: mockProduct1.id,
        title: mockProduct1.title,
        price: mockProduct1.price,
        description: mockProduct1.description,
        quantity: 3,
      });
    });
  });

  describe("integration tests", () => {
    it("should handle a complete shopping flow", () => {
      // Add items
      let newCart = cart.addItem(mockProduct1, 2);
      newCart = newCart.addItem(mockProduct2, 1);
      newCart = newCart.addItem(mockProduct3, 3);
      expect(newCart.getItemCount()).toBe(6);
      expect(newCart.getTotal()).toBe("62.48");

      // Update quantity
      newCart = newCart.updateQuantity(mockProduct1.id, 5);
      expect(newCart.getItemCount()).toBe(9);

      // Remove an item
      newCart = newCart.removeItem(mockProduct3.id);
      expect(newCart.toArray()).toHaveLength(2);

      // Clear cart
      newCart = newCart.clear();
      expect(newCart.getItemCount()).toBe(0);
      expect(newCart.getTotal()).toBe("0.00");
    });

    it("should maintain immutability throughout operations", () => {
      const cart1 = cart.addItem(mockProduct1, 1);
      const cart2 = cart1.addItem(mockProduct2, 1);
      const cart3 = cart2.updateQuantity(mockProduct1.id, 5);
      const cart4 = cart3.removeItem(mockProduct2.id);

      // All instances should be different
      expect(cart).not.toBe(cart1);
      expect(cart1).not.toBe(cart2);
      expect(cart2).not.toBe(cart3);
      expect(cart3).not.toBe(cart4);

      // Original carts should remain unchanged
      expect(cart.toArray()).toHaveLength(0);
      expect(cart1.toArray()).toHaveLength(1);
      expect(cart2.toArray()).toHaveLength(2);
      expect(cart3.toArray()).toHaveLength(2);
      expect(cart4.toArray()).toHaveLength(1);
    });
  });
});
