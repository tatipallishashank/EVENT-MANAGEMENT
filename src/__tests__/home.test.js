// Training.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import Training from "../Components/Home/Training.jsx";

describe("Training Component", () => {
  it("renders without crashing", () => {
    render(<Training />);
  });

  it('displays the heading "Training Features"', () => {
    render(<Training />);

    expect(screen.getByText("Training Features")).toBeInTheDocument();
  });

  it("renders multiple training items with images and descriptions", () => {
    render(<Training />);

    // Replace these selectors with your actual class names or use data-testid attributes
    const trainingItems = screen.getAllByRole("img");

    expect(trainingItems).toHaveLength(4); // Adjust based on the actual number of items

    trainingItems.forEach((item) => {
      expect(item).toBeInTheDocument();

      expect(screen.getByText("Training Features")).toBeInTheDocument();
      // Add more specific checks based on your component structure
    });
  });
});
