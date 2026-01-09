import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

const mockTrendingProducts = [
  {
    id: 1,
    title: "Product 1",
    price: 19.99,
    image: "https://example.com/product1.jpg",
    rating: { rate: 4.5, count: 120 },
  },
  {
    id: 2,
    title: "Product 2",
    price: 29.99,
    image: "https://example.com/product2.jpg",
    rating: { rate: 4.0, count: 85 },
  },
  {
    id: 3,
    title: "Product 3",
    price: 39.99,
    image: "https://example.com/product3.jpg",
    rating: { rate: 4.8, count: 200 },
  },
];

const mockAddToCart = vi.fn();
const mockOnItemAdded = vi.fn();

const renderHome = () => {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
};

// Mock the custom hook
vi.mock("../../utils/useFetchItemsById", () => ({
  default: vi.fn(),
}));

// Mock the outlet context
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useOutletContext: () => ({
      addToCart: mockAddToCart,
      onItemAdded: mockOnItemAdded,
    }),
  };
});

import useFetchItemsById from "../../utils/useFetchItemsById";

describe("Home Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders 'Start Shopping' button with link to shop", () => {
    useFetchItemsById.mockReturnValue({
      items: [],
      loading: true,
      error: null,
    });

    renderHome();

    const shopLink = screen.getByRole("link", { name: /start shopping/i });
    expect(shopLink).toBeInTheDocument();
    expect(shopLink).toHaveAttribute("href", "/shop");
  });

  it("displays loading state for trending products", () => {
    useFetchItemsById.mockReturnValue({
      items: [],
      loading: true,
      error: null,
    });

    renderHome();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays error message when fetch fails", () => {
    const errorMessage = "Failed to fetch";
    useFetchItemsById.mockReturnValue({
      items: [],
      loading: false,
      error: { message: errorMessage },
    });

    renderHome();

    expect(
      screen.getByText(`Error loading products: ${errorMessage}`)
    ).toBeInTheDocument();
  });

  it("renders trending section with products when data is loaded", async () => {
    useFetchItemsById.mockReturnValue({
      items: mockTrendingProducts,
      loading: false,
      error: null,
    });

    renderHome();

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: mockTrendingProducts[0].title })
      ).toBeInTheDocument();
    });

    expect(
      screen.getByRole("heading", { name: mockTrendingProducts[1].title })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: mockTrendingProducts[2].title })
    ).toBeInTheDocument();
  });

  it("calls useFetchItemsById with correct trending IDs", () => {
    useFetchItemsById.mockReturnValue({
      items: [],
      loading: true,
      error: null,
    });

    renderHome();

    expect(useFetchItemsById).toHaveBeenCalledWith([1, 2, 3, 4, 5]);
  });

  it("renders correct number of product cards", async () => {
    useFetchItemsById.mockReturnValue({
      items: mockTrendingProducts,
      loading: false,
      error: null,
    });

    renderHome();

    await waitFor(() => {
      const productImages = screen.getAllByRole("img");
      expect(productImages).toHaveLength(mockTrendingProducts.length);
    });
  });
});
