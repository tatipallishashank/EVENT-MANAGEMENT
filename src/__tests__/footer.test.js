// Footer.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import Footer from "../Components/Footer/Footer";

describe("Footer Component", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  });

  it('renders the logo when location does not include "admin" or "booking"', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByAltText("Logo")).toBeInTheDocument();
  });

  it('does not render the logo when location includes "admin"', () => {
    render(
      <MemoryRouter initialEntries={["/admin/dashboard"]}>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.queryByAltText("Logo")).toBeNull();
    expect(screen.queryByAltText("Logo")).toBeNull();
  });

  it('does not render the logo when location includes "booking"', () => {
    render(
      <MemoryRouter initialEntries={["/booking/event123"]}>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.queryByAltText("Logo")).toBeNull();
  });

  // Add more specific tests based on your component's behavior and content
});
