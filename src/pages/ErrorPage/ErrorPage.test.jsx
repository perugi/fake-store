import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const mockUseRouteError = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useRouteError: () => mockUseRouteError(),
  };
});

const renderErrorPage = () => {
  return render(
    <MemoryRouter>
      <ErrorPage />
    </MemoryRouter>
  );
};

describe("ErrorPage Component", () => {
  beforeEach(() => {
    mockUseRouteError.mockClear();
  });
  it("renders 404 error correctly", () => {
    mockUseRouteError.mockReturnValue({
      status: 404,
      statusText: "Not Found",
    });

    renderErrorPage();

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    expect(
      screen.getByText(
        /The page you're looking for doesn't exist. It might have been moved or deleted./i
      )
    ).toBeInTheDocument();
  });

  it("renders non-404 errors with generic message", () => {
    mockUseRouteError.mockReturnValue({
      status: 500,
      statusText: "Internal Server Error",
    });

    renderErrorPage();

    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getByText("Oops! Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText(
        /We encountered an unexpected error. Please try again later./i
      )
    ).toBeInTheDocument();
  });

  it("renders generic error when no status is provided", () => {
    mockUseRouteError.mockReturnValue({});

    renderErrorPage();

    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("Oops! Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText(
        /We encountered an unexpected error. Please try again later./i
      )
    ).toBeInTheDocument();
  });

  it("renders go back home button with correct link", () => {
    mockUseRouteError.mockReturnValue({
      status: 404,
    });

    renderErrorPage();

    const homeLink = screen.getByRole("link");
    expect(homeLink).toHaveAttribute("href", "/");
    expect(
      screen.getByRole("button", { name: /go back home/i })
    ).toBeInTheDocument();
  });
});
