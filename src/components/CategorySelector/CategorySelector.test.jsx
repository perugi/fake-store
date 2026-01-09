import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import CategorySelector from "./CategorySelector";

const mockItems = [
  { id: 1, category: "men's clothing", title: "Shirt" },
  { id: 2, category: "men's clothing", title: "Pants" },
  { id: 3, category: "women's clothing", title: "Dress" },
  { id: 4, category: "jewelery", title: "Necklace" },
  { id: 5, category: "electronics", title: "Phone" },
  { id: 6, category: "electronics", title: "Laptop" },
];

const renderCategorySelector = (props = {}) => {
  const defaultProps = {
    items: mockItems,
    activeCategory: "all",
    setActiveCategory: vi.fn(),
  };

  return render(<CategorySelector {...defaultProps} {...props} />);
};

describe("CategorySelector Component", () => {
  describe("Accessibility", () => {
    it("renders as a navigation landmark with proper label", () => {
      renderCategorySelector();

      const nav = screen.getByRole("navigation", {
        name: "Product categories",
      });
      expect(nav).toBeInTheDocument();
    });

    it("sets aria-pressed correctly for active and inactive categories", () => {
      renderCategorySelector({ activeCategory: "electronics" });

      const electronicsButton = screen.getByRole("button", {
        name: /electronics.*2 items/i,
      });
      expect(electronicsButton).toHaveAttribute("aria-pressed", "true");

      const allButton = screen.getByRole("button", {
        name: /all.*6 items/i,
      });
      expect(allButton).toHaveAttribute("aria-pressed", "false");
    });

    it("includes item count in accessible label", () => {
      renderCategorySelector();

      expect(
        screen.getByRole("button", { name: /all.*6 items/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /men's clothing.*2 items/i })
      ).toBeInTheDocument();
    });
  });

  describe("Rendering", () => {
    it("renders all category buttons", () => {
      renderCategorySelector();

      expect(
        screen.getByRole("button", { name: /all.*6 items/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /men's clothing.*2 items/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /women's clothing.*1 items/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /jewelery.*1 items/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /electronics.*2 items/i })
      ).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("calls setActiveCategory with correct category for each button", async () => {
      const user = userEvent.setup();
      const setActiveCategory = vi.fn();
      renderCategorySelector({ setActiveCategory });

      await user.click(screen.getByRole("button", { name: /all.*6 items/i }));
      expect(setActiveCategory).toHaveBeenLastCalledWith("all");

      await user.click(
        screen.getByRole("button", { name: /women's clothing.*1 items/i })
      );
      expect(setActiveCategory).toHaveBeenLastCalledWith("women's clothing");

      await user.click(
        screen.getByRole("button", { name: /electronics.*2 items/i })
      );
      expect(setActiveCategory).toHaveBeenLastCalledWith("electronics");

      expect(setActiveCategory).toHaveBeenCalledTimes(3);
    });
  });

  describe("Empty items", () => {
    it("displays zero counts when items array is empty", () => {
      renderCategorySelector({ items: [] });

      expect(
        screen.getByRole("button", { name: /^all.*0 items/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /^men's clothing.*0 items/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /^women's clothing.*0 items/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /^jewelery.*0 items/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /^electronics.*0 items/i })
      ).toBeInTheDocument();
    });
  });
});
