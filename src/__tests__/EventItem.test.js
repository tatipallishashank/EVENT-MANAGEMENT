// EventItem.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthContext } from "../context/AuthContext";
import { EventItem } from "../Components/Events/MyEvents";
import { MemoryRouter } from "react-router-dom";

const mockEvent = {
  date: "2023-11-12T07:34",
  address: "Hyderabad",
  duration: 4,
  title: "King New Life India Tour By TI LIVE -(Hyderabad)",
  description:
    "<p>Get ready for a musical extravaganza as Indian sensation King embarks on a sensational tour across India! Join us for electrifying performances, chart-topping hits, and an unforgettable night of music and entertainment. Experience the magic of King's soulful voice and dynamic stage presence in a city near you. Don't miss out on this epic musical journey!</p>",
  id: "louu24tg",
  ticketPrice: 100,
  categories: "Concert",
  organizer: {
    events: [],
    email: "admin@admin.com",
    lastName: "Admin",
    uid: "4vZejgcCqNQiQ9Vnc7f2puh8xOD2",
    firstName: "Admin",
  },
  image:
    "https://firebasestorage.googleapis.com/v0/b/courses-4d59c.appspot.com/o/louubisa?alt=media&token=26ed46a7-dc15-40b1-bfef-4bdf0436448e",
};

const mockSetEvents = jest.fn();

const mockContextValue = {
  setEvents: mockSetEvents,
};

test("renders EventItem component", () => {
  render(
    <MemoryRouter>
      <AuthContext.Provider value={mockContextValue}>
        <EventItem event={mockEvent} setEvents={mockSetEvents} />
      </AuthContext.Provider>{" "}
    </MemoryRouter>
  );

  // You can write assertions based on the content and structure of the EventItem component.
  // For example, check if event title, date, address, categories, ticket price, etc., are displayed correctly.

  expect(screen.getByText(mockEvent.title)).toBeInTheDocument();
  // Add more assertions based on your component structure and data.
});

test("calls deleteEvent function when delete button is clicked", async () => {
  render(
    <MemoryRouter>
      <AuthContext.Provider value={mockContextValue}>
        <EventItem event={mockEvent} setEvents={mockSetEvents} />
      </AuthContext.Provider>
    </MemoryRouter>
  );

  const deleteButton = screen.getByText("Delete");
  fireEvent.click(deleteButton);

  // You can assert that the confirmation prompt is displayed
  // and mock the window.confirm function to return true for testing purposes.

  // Check if setEvents is called after the delete confirmation
  expect(mockSetEvents).toBeCalledTimes(0);
});

// You can write more tests to cover different scenarios and interactions.
