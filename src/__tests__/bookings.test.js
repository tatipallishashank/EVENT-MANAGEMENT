// MyBookings.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import MyBookings from "../Components/Events/MyBookings";
import { AuthContext } from "../context/AuthContext";

const mockUser = {
  // Your mock user data
  firstName: "firstName",
  lastName: "lastName",
  email: "email@gmail.com",
  uid: 133,
};

const mockEvents = [
  // Your mock events data
];

const mockContextValue = {
  events: mockEvents,
  user: mockUser,
};

test("renders MyBookings component with no bookings", () => {
  render(
    <AuthContext.Provider value={mockContextValue}>
      <MyBookings />
    </AuthContext.Provider>
  );

  expect(screen.getByText("No Bookings Found")).toBeInTheDocument();
});

// You can write similar tests for the case where there are bookings.
// For example, you can provide a context value with some mock bookings.
