import { describe, it, expect } from "vitest";
import { fetchReducer, FETCH_ACTIONS, initialFetchState } from "./fetchReducer";

describe("fetchReducer", () => {
  describe("LOADING action", () => {
    it("should set loading to true and clear items and error", () => {
      const previousState = {
        items: [{ id: 1, name: "Test" }],
        loading: false,
        error: new Error("Previous error"),
      };

      const newState = fetchReducer(previousState, {
        type: FETCH_ACTIONS.LOADING,
      });

      expect(newState).toEqual({
        items: [],
        loading: true,
        error: null,
      });
    });

    it("should work from initial state", () => {
      const newState = fetchReducer(initialFetchState, {
        type: FETCH_ACTIONS.LOADING,
      });

      expect(newState).toEqual({
        items: [],
        loading: true,
        error: null,
      });
    });
  });

  describe("SUCCESS action", () => {
    it("should set items, clear loading and error", () => {
      const previousState = {
        items: [],
        loading: true,
        error: null,
      };

      const mockItems = [
        { id: 1, title: "Product 1" },
        { id: 2, title: "Product 2" },
      ];

      const newState = fetchReducer(previousState, {
        type: FETCH_ACTIONS.SUCCESS,
        payload: mockItems,
      });

      expect(newState).toEqual({
        items: mockItems,
        loading: false,
        error: null,
      });
    });

    it("should replace previous items", () => {
      const previousState = {
        items: [{ id: 99, title: "Old Product" }],
        loading: true,
        error: null,
      };

      const newItems = [{ id: 1, title: "New Product" }];

      const newState = fetchReducer(previousState, {
        type: FETCH_ACTIONS.SUCCESS,
        payload: newItems,
      });

      expect(newState.items).toEqual(newItems);
      expect(newState.items).not.toContain(previousState.items[0]);
    });

    it("should handle empty array payload", () => {
      const newState = fetchReducer(initialFetchState, {
        type: FETCH_ACTIONS.SUCCESS,
        payload: [],
      });

      expect(newState).toEqual({
        items: [],
        loading: false,
        error: null,
      });
    });
  });

  describe("ERROR action", () => {
    it("should set error, clear loading and items", () => {
      const previousState = {
        items: [{ id: 1, title: "Product" }],
        loading: true,
        error: null,
      };

      const mockError = new Error("Network error");

      const newState = fetchReducer(previousState, {
        type: FETCH_ACTIONS.ERROR,
        payload: mockError,
      });

      expect(newState).toEqual({
        items: [],
        loading: false,
        error: mockError,
      });
    });

    it("should replace previous error", () => {
      const previousState = {
        items: [],
        loading: true,
        error: new Error("Old error"),
      };

      const newError = new Error("New error");

      const newState = fetchReducer(previousState, {
        type: FETCH_ACTIONS.ERROR,
        payload: newError,
      });

      expect(newState.error).toBe(newError);
      expect(newState.error.message).toBe("New error");
    });
  });

  describe("default case", () => {
    it("should return unchanged state for unknown action", () => {
      const previousState = {
        items: [{ id: 1 }],
        loading: false,
        error: null,
      };

      const newState = fetchReducer(previousState, {
        type: "UNKNOWN_ACTION",
      });

      expect(newState).toBe(previousState);
    });

    it("should return unchanged state when action type is undefined", () => {
      const previousState = {
        items: [],
        loading: true,
        error: null,
      };

      const newState = fetchReducer(previousState, {});

      expect(newState).toBe(previousState);
    });
  });

  describe("state immutability", () => {
    it("should not mutate the previous state", () => {
      const previousState = {
        items: [{ id: 1, title: "Product" }],
        loading: false,
        error: null,
      };

      const originalState = { ...previousState };

      fetchReducer(previousState, {
        type: FETCH_ACTIONS.LOADING,
      });

      expect(previousState).toEqual(originalState);
    });
  });
});
