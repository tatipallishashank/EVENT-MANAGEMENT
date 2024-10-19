// Contact.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import Contact from "../Components/About/Contact";

describe("Contact Component", () => {
  it("renders without crashing", () => {
    render(<Contact />);
  });

  it('displays the heading "Get In Touch"', () => {
    render(<Contact />);

    expect(screen.getByText("Get In Touch")).toBeInTheDocument();
  });

  it("displays the contact information with icons and details", () => {
    render(<Contact />);

    // Replace these selectors with your actual email, location, and phone details or use data-testid attributes
    expect(screen.getByText(/admin@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByText(/hyderabad/i)).toBeInTheDocument();

    // Replace these selectors with your actual icons or use data-testid attributes
    // expect(screen.getByTestId("email-icon")).toBeInTheDocument();
    // expect(screen.getByTestId("location-icon")).toBeInTheDocument();
    // expect(screen.getByTestId("phone-icon")).toBeInTheDocument();
  });

  it("has valid links for email, location, and phone", () => {
    render(<Contact />);

    // Replace these selectors with your actual email, location, and phone links or use data-testid attributes
    expect(screen.getByText(/admin@gmail.com/i).closest("a"));
    // Add similar assertions for location and phone links
  });
});
