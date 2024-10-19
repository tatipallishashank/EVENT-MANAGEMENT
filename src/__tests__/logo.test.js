// Logo.test.js
import React from "react";
import { render } from "@testing-library/react";
import Logo from "../Helpers/Logo";

describe("Logo Component", () => {
  it("renders the Logo component with correct alt text", () => {
    const { getByAltText } = render(<Logo />);
    const logoElement = getByAltText("Berry");
    expect(logoElement).toBeInTheDocument();
  });

  it("renders the Logo component with correct image source", () => {
    const { getByAltText } = render(<Logo />);
    const logoElement = getByAltText("Berry");
    expect(logoElement.src).toContain("logo.svg");
  });

  it("renders the Logo component with correct width", () => {
    const { getByAltText } = render(<Logo />);
    const logoElement = getByAltText("Berry");
    expect(logoElement.width).toBe(50);
  });

  // Add more test cases as needed, for example, testing the lazy loading attribute
});
