class ShoppingCart {
  constructor(items = []) {
    this.items = items;
  }

  addItem(product, quantity) {
    const existingItemIndex = this.items.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex !== -1) {
      const updatedItems = [...this.items];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + quantity,
      };
      return new ShoppingCart(
        updatedItems.toSorted((a, b) => a.title.localeCompare(b.title))
      );
    } else {
      return new ShoppingCart([...this.items, { ...product, quantity }]);
    }
  }

  updateQuantity(productId, quantity) {
    const updatedItems = this.items.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    return new ShoppingCart(updatedItems);
  }

  removeItem(productId) {
    const updatedItems = this.items.filter((item) => item.id !== productId);
    return new ShoppingCart(updatedItems);
  }

  clear() {
    return new ShoppingCart([]);
  }

  getTotal() {
    return this.items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  }

  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  toArray() {
    return this.items;
  }
}

export default ShoppingCart;
