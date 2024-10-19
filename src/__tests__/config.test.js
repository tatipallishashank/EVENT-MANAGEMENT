// Update the import path based on your project structure

import { ADMIN, CATEGORIES } from "../config";

describe("Constants", () => {
  it("should export ADMIN constant", () => {
    expect(ADMIN).toBeDefined();
    expect(typeof ADMIN).toBe("string");
    // Add more specific checks if needed
  });

  it("should export CATEGORIES constant", () => {
    expect(CATEGORIES).toBeDefined();
    expect(Array.isArray(CATEGORIES)).toBe(true);
    expect(CATEGORIES.length).toBeGreaterThan(0);
    // Add more specific checks for the array elements if needed
  });
});
