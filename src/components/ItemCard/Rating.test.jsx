import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Rating from "./Rating";

describe("Rating Component", () => {
  it("renders with valid rating data", () => {
    const rating = { rate: 4.5, count: 120 };
    render(<Rating rating={rating} />);

    expect(screen.getByText("4.5")).toBeInTheDocument();
    expect(screen.getByText("(120)")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Rating: 4.5 out of 5 from 120 reviews")
    ).toBeInTheDocument();
  });

  it("handles missing rating prop gracefully", () => {
    render(<Rating />);

    expect(screen.getByText("0.0")).toBeInTheDocument();
    expect(screen.getByText("(0)")).toBeInTheDocument();
  });

  it("handles undefined rate and count", () => {
    render(<Rating rating={{}} />);

    expect(screen.getByText("0.0")).toBeInTheDocument();
    expect(screen.getByText("(0)")).toBeInTheDocument();
  });

  it("renders correct number of full stars for whole number rating", () => {
    const rating = { rate: 4.0, count: 100 };
    const { container } = render(<Rating rating={rating} />);

    const fullStars = container.querySelectorAll(
      '.material-icons:not([aria-hidden="false"])'
    );
    const starText = Array.from(fullStars).filter(
      (el) => el.textContent.trim() === "star"
    );
    expect(starText).toHaveLength(4);
  });

  it("renders half star for ratings between 0.25 and 0.75", () => {
    const rating = { rate: 3.5, count: 50 };
    render(<Rating rating={rating} />);

    expect(screen.getByText("star_half")).toBeInTheDocument();
  });

  it("rounds up when rating remainder is >= 0.75", () => {
    const rating = { rate: 4.8, count: 200 };
    const { container } = render(<Rating rating={rating} />);

    const fullStars = container.querySelectorAll(
      '.material-icons:not([aria-hidden="false"])'
    );
    const starText = Array.from(fullStars).filter(
      (el) => el.textContent.trim() === "star"
    );
    expect(starText).toHaveLength(5);
  });

  it("renders empty stars for remaining stars", () => {
    const rating = { rate: 2.0, count: 30 };
    render(<Rating rating={rating} />);

    const emptyStars = screen.getAllByText("star_border");
    expect(emptyStars).toHaveLength(3);
  });

  it("formats rating to one decimal place", () => {
    const rating = { rate: 3.456789, count: 89 };
    render(<Rating rating={rating} />);

    expect(screen.getByText("3.5")).toBeInTheDocument();
  });

  it("has accessible aria-label", () => {
    const rating = { rate: 4.2, count: 156 };
    render(<Rating rating={rating} />);

    const ratingElement = screen.getByLabelText(
      /Rating: 4.2 out of 5 from 156 reviews/i
    );
    expect(ratingElement).toBeInTheDocument();
  });
});
