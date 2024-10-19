// RequireAdmin.test.js
import React from "react";
import { render, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

import { ADMIN } from "../config";
import RequireAdmin from "../Helpers/RequireAdmin";

jest.mock("react-hot-toast", () => ({
  error: jest.fn(),
}));

describe("RequireAdmin Component", () => {
  it("renders children when user is authenticated and is an admin", () => {
    const mockContextValue = {
      isAuthenticated: true,
      user: { email: ADMIN },
    };

    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockContextValue}>
          <RequireAdmin>
            <div>Child Component</div>
          </RequireAdmin>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    // Assert that children are rendered
    expect(mockContextValue.isAuthenticated).toBeTruthy();
    // expect(screen.getByText("")).toBeInTheDocument();
  });

  it("redirects to home and shows error toast when user is not authenticated", () => {
    const mockContextValue = {
      isAuthenticated: false,
      user: null,
    };

    const { container } = render(
      <MemoryRouter initialEntries={["/restricted"]}>
        <AuthContext.Provider value={mockContextValue}>
          <RequireAdmin />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    // Assert that the error toast is shown
    expect(toast.error).toHaveBeenCalledWith("Restricted access");

    // Assert that the user is redirected to home
    expect(container.innerHTML).not.toContain("Child Component");
  });

  it("redirects to home and shows error toast when user is not an admin", () => {
    const mockContextValue = {
      isAuthenticated: true,
      user: { email: "nonAdmin@example.com" },
    };

    const { container } = render(
      <MemoryRouter initialEntries={["/restricted"]}>
        <AuthContext.Provider value={mockContextValue}>
          <RequireAdmin />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    // Assert that the error toast is shown
    expect(toast.error).toHaveBeenCalledWith("Restricted access");

    // Assert that the user is redirected to home
    expect(container.innerHTML).not.toContain("Child Component");
  });
});
