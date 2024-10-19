// About.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import About from "../Components/About/About";

describe("About Component", () => {
  it("renders without crashing", () => {
    render(<About />);
  });

  it('displays the heading "About Us"', () => {
    render(<About />);

    expect(screen.getByText("About Us")).toBeInTheDocument();
  });

  it("displays the about content", () => {
    render(<About />);

    // Replace these selectors with your actual text content or use data-testid attributes
    expect(screen.getByText(/eventScape/i)).toBeInTheDocument();
    expect(screen.getByText(/bringing people together/i)).toBeInTheDocument();
    expect(
      screen.getByText(/passionate team of event enthusiasts/i)
    ).toBeInTheDocument();
    // Add more specific checks based on your component structure
  });

  it("displays the contact information with phone and email links", () => {
    render(<About />);

    // Replace these selectors with your actual phone and email content or use data-testid attributes

    expect(screen.getByText("admin@gmail.com")).toBeInTheDocument();

    // Replace these selectors with your actual phone and email links or use data-testid attributes

    expect(
      screen.getByRole("link", { name: /admin@gmail.com/i })
    ).toHaveAttribute("href", "mailto:admin@gmail.com");
  });
});
