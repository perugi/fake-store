import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProductDetails from "./ProductDetails";

const mockProduct = {
  id: 1,
  title: "Wireless Headphones",
  price: 79.99,
  description:
    "Premium wireless headphones with noise cancellation and 30-hour battery life.",
  image: "https://example.com/headphones.jpg",
  rating: {
    rate: 4.5,
    count: 230,
  },
};

const mockAddToCart = vi.fn();
const mockOnItemAdded = vi.fn();

const renderProductDetails = (productId = "1") => {
  return render(
    <MemoryRouter initialEntries={[`/product/${productId}`]}>
      <Routes>
        <Route
          path="/product/:productId"
          element={<ProductDetails />}
          loader={() => ({
            addToCart: mockAddToCart,
            onItemAdded: mockOnItemAdded,
          })}
          handle={{
            outlet: {
              addToCart: mockAddToCart,
              onItemAdded: mockOnItemAdded,
            },
          }}
        />
      </Routes>
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

describe("ProductDetails Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays loading state initially", () => {
    useFetchItemsById.mockReturnValue({
      items: [],
      loading: true,
      error: null,
    });

    renderProductDetails();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays error message when fetch fails", () => {
    const errorMessage = "Network error";
    useFetchItemsById.mockReturnValue({
      items: [],
      loading: false,
      error: { message: errorMessage },
    });

    renderProductDetails();

    expect(
      screen.getByText(`Error loading product: ${errorMessage}`)
    ).toBeInTheDocument();
  });

  it("renders product details when data is loaded", async () => {
    useFetchItemsById.mockReturnValue({
      items: [mockProduct],
      loading: false,
      error: null,
    });

    renderProductDetails();

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: mockProduct.title })
      ).toBeInTheDocument();
    });

    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText(`${mockProduct.price}€`)).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: mockProduct.title })
    ).toHaveAttribute("src", mockProduct.image);
  });

  it("renders 'See All Products' link to shop", async () => {
    useFetchItemsById.mockReturnValue({
      items: [mockProduct],
      loading: false,
      error: null,
    });

    renderProductDetails();

    await waitFor(() => {
      const shopLink = screen.getByRole("link", { name: /see all products/i });
      expect(shopLink).toBeInTheDocument();
      expect(shopLink).toHaveAttribute("href", "/shop");
    });
  });

  it("calls useFetchItemsById with correct product id", () => {
    useFetchItemsById.mockReturnValue({
      items: [mockProduct],
      loading: false,
      error: null,
    });

    renderProductDetails("42");

    expect(useFetchItemsById).toHaveBeenCalledWith(["42"]);
  });
});
