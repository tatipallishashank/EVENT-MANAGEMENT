// MyEvents.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import MyEvents from "../Components/Events/MyEvents";
import { AuthContext } from "../context/AuthContext";
import { MemoryRouter } from "react-router-dom";

const mockUser = {
  // Your mock user data
};

const mockEvents = [
  // Your mock events data
];

const mockContextValue = {
  events: mockEvents,
  setEvents: jest.fn(),
  user: mockUser,
};

test("renders MyEvents component with no events", () => {
  render(
    <MemoryRouter>
      <AuthContext.Provider value={mockContextValue}>
        <MyEvents />
      </AuthContext.Provider>
    </MemoryRouter>
  );

  expect(screen.getByText("No Events Found")).toBeInTheDocument();
});

// You can write similar tests for the case where there are events.
// For example, you can provide a context value with some mock events.
