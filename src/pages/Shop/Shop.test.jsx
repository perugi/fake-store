import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Shop from "./Shop";

const mockProducts = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: 79.99,
    category: "electronics",
    image: "https://example.com/headphones.jpg",
    rating: { rate: 4.5, count: 120 },
  },
  {
    id: 2,
    title: "Cotton T-Shirt",
    price: 19.99,
    category: "clothing",
    image: "https://example.com/tshirt.jpg",
    rating: { rate: 4.0, count: 85 },
  },
  {
    id: 3,
    title: "Bluetooth Speaker",
    price: 49.99,
    category: "electronics",
    image: "https://example.com/speaker.jpg",
    rating: { rate: 4.8, count: 200 },
  },
  {
    id: 4,
    title: "Leather Jacket",
    price: 149.99,
    category: "clothing",
    image: "https://example.com/jacket.jpg",
    rating: { rate: 4.3, count: 60 },
  },
];

const mockAddToCart = vi.fn();
const mockOnItemAdded = vi.fn();

const renderShop = (initialUrl = "/shop") => {
  return render(
    <MemoryRouter initialEntries={[initialUrl]}>
      <Shop />
    </MemoryRouter>
  );
};

// Mock the custom hook
vi.mock("../../utils/useFetchAllItems", () => ({
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

import useFetchAllItems from "../../utils/useFetchAllItems";

describe("Shop Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays loading state initially", () => {
    useFetchAllItems.mockReturnValue({
      items: [],
      loading: true,
      error: null,
    });

    renderShop();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays error message when fetch fails", () => {
    const errorMessage = "Failed to fetch products";
    useFetchAllItems.mockReturnValue({
      items: [],
      loading: false,
      error: { message: errorMessage },
    });

    renderShop();

    expect(
      screen.getByText(`Error loading products: ${errorMessage}`)
    ).toBeInTheDocument();
  });

  it("renders products when data is loaded", async () => {
    useFetchAllItems.mockReturnValue({
      items: mockProducts,
      loading: false,
      error: null,
    });

    renderShop();

    await waitFor(() => {
      const headings = screen.getAllByRole("heading", { level: 2 });
      expect(headings).toHaveLength(mockProducts.length);
    });
  });

  it("sorts products by price ascending", async () => {
    const user = userEvent.setup();
    useFetchAllItems.mockReturnValue({
      items: mockProducts,
      loading: false,
      error: null,
    });

    renderShop();

    const sortFieldSelect = screen.getByDisplayValue("Name");
    await user.selectOptions(sortFieldSelect, "price");

    await waitFor(() => {
      const headings = screen.getAllByRole("heading", { level: 2 });
      expect(headings[0]).toHaveTextContent("Cotton T-Shirt"); // $19.99
      expect(headings[1]).toHaveTextContent("Bluetooth Speaker"); // $49.99
    });
  });

  it("sorts products descending", async () => {
    const user = userEvent.setup();
    useFetchAllItems.mockReturnValue({
      items: mockProducts,
      loading: false,
      error: null,
    });

    renderShop();

    const sortOrderSelect = screen.getByDisplayValue("Ascending");
    await user.selectOptions(sortOrderSelect, "desc");

    await waitFor(() => {
      const headings = screen.getAllByRole("heading", { level: 2 });
      expect(headings[0]).toHaveTextContent("Wireless Headphones");
    });
  });

  it("renders CategorySelector component", () => {
    useFetchAllItems.mockReturnValue({
      items: mockProducts,
      loading: false,
      error: null,
    });

    renderShop();

    // CategorySelector should render category buttons
    expect(screen.getByRole("button", { name: /all/i })).toBeInTheDocument();
  });

  it("displays search results message and filters products by search query", async () => {
    useFetchAllItems.mockReturnValue({
      items: mockProducts,
      loading: false,
      error: null,
    });

    renderShop("/shop?q=bluetooth");

    await waitFor(() => {
      expect(
        screen.getByText('Search results for "bluetooth"')
      ).toBeInTheDocument();
    });

    expect(
      screen.getByRole("heading", { name: "Bluetooth Speaker" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Cotton T-Shirt" })
    ).not.toBeInTheDocument();
  });

  it("filters products by category", async () => {
    useFetchAllItems.mockReturnValue({
      items: mockProducts,
      loading: false,
      error: null,
    });

    renderShop("/shop?category=electronics");

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Wireless Headphones" })
      ).toBeInTheDocument();
    });

    expect(
      screen.getByRole("heading", { name: "Bluetooth Speaker" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Cotton T-Shirt" })
    ).not.toBeInTheDocument();
  });

  it("shows all products when category is 'all'", async () => {
    useFetchAllItems.mockReturnValue({
      items: mockProducts,
      loading: false,
      error: null,
    });

    renderShop("/shop?category=all");

    await waitFor(() => {
      const headings = screen.getAllByRole("heading", { level: 2 });
      expect(headings).toHaveLength(mockProducts.length);
    });
  });
});
