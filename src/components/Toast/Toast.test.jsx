import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Toast from "./Toast";
import styles from "./Toast.module.css";

describe("Toast Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders with message content", () => {
    render(<Toast>Item added to cart!</Toast>);

    expect(screen.getByRole("alert")).toHaveTextContent("Item added to cart!");
  });

  it("has correct accessibility attributes", () => {
    render(<Toast>Notification</Toast>);

    const toast = screen.getByRole("alert");
    expect(toast).toHaveAttribute("aria-live", "assertive");
  });

  it("is initially visible", () => {
    const { container } = render(<Toast>Message</Toast>);

    const toast = container.querySelector('[role="alert"]');
    expect(toast).toHaveClass(styles.show);
  });

  it("hides after default duration of 3000ms", () => {
    const { container } = render(<Toast>Message</Toast>);

    const toast = container.querySelector('[role="alert"]');
    expect(toast).toHaveClass(styles.show);

    // Still visible before duration expires
    act(() => {
      vi.advanceTimersByTime(2999);
    });
    expect(toast).toHaveClass(styles.show);

    // Hides after duration
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(toast).toHaveClass(styles.hide);
  });

  it("hides after custom duration", () => {
    const { container } = render(<Toast duration={5000}>Message</Toast>);

    const toast = container.querySelector('[role="alert"]');
    expect(toast).toHaveClass(styles.show);

    // Still visible before duration expires
    act(() => {
      vi.advanceTimersByTime(4999);
    });
    expect(toast).toHaveClass(styles.show);

    // Hides after duration
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(toast).toHaveClass(styles.hide);
  });

  it("calls onComplete callback after duration + animation time", () => {
    const mockOnComplete = vi.fn();
    render(
      <Toast duration={3000} onComplete={mockOnComplete}>
        Message
      </Toast>
    );

    expect(mockOnComplete).not.toHaveBeenCalled();

    // After duration (3000ms), toast starts hiding
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(mockOnComplete).not.toHaveBeenCalled();

    // After animation time (300ms), onComplete is called
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(mockOnComplete).toHaveBeenCalledTimes(1);
  });

  it("does not error when onComplete is not provided", () => {
    render(<Toast duration={1000}>Message</Toast>);

    expect(() => {
      act(() => {
        vi.advanceTimersByTime(1300);
      });
    }).not.toThrow();
  });

  it("clears timers on unmount", () => {
    const mockOnComplete = vi.fn();
    const { unmount } = render(
      <Toast duration={3000} onComplete={mockOnComplete}>
        Message
      </Toast>
    );

    // Unmount before timers complete
    unmount();

    // Advance time past when callbacks would have fired
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    // onComplete should not have been called
    expect(mockOnComplete).not.toHaveBeenCalled();
  });

  it("updates timers when duration prop changes", () => {
    const mockOnComplete = vi.fn();
    const { rerender } = render(
      <Toast duration={3000} onComplete={mockOnComplete}>
        Message
      </Toast>
    );

    // Advance partway through original duration
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Change duration
    rerender(
      <Toast duration={5000} onComplete={mockOnComplete}>
        Message
      </Toast>
    );

    // Old timer was cleared, new timer starts from 0
    act(() => {
      vi.advanceTimersByTime(5300);
    });

    expect(mockOnComplete).toHaveBeenCalledTimes(1);
  });

  it("renders different types of messages", () => {
    const { rerender } = render(<Toast>Success message</Toast>);
    expect(screen.getByRole("alert")).toHaveTextContent("Success message");

    rerender(<Toast>Error message</Toast>);
    expect(screen.getByRole("alert")).toHaveTextContent("Error message");
  });
});
