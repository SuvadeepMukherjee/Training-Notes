//Import React for rendering components
import React from "react";

//Import functions from React Testing Library
import { render, screen, fireEvent } from "@testing-library/react";

// Import BrowserRouter to wrap components that use React Router
import { BrowserRouter } from "react-router-dom";

// Import the Navbar component to be tested
import { Navbar } from "./navbar";

// Import the ShopContext to provide mock context data
import { ShopContext } from "../context/shop-context";

// Mock context value
const mockContextValue = {
  user: {
    _id: "12345",
    name: "John Doe",
    email: "john@example.com",
  },
  cartItems: { 1: 2, 2: 1 }, // Mocking two items in the cart
  getTotalCartItems: jest.fn(async () => 3), // Mocking total items function
  addToCart: jest.fn(), // Mock addToCart function
  removeFromCart: jest.fn(), // Mock removeFromCart function
  getTotalCartAmount: jest.fn(), // Mock getTotalCartAmount function
};

// Define test suite for the Navbar component
describe("Navbar Component", () => {
  // Test: Check if Navbar renders with "Shop" and "Cart" links
  test.skip("renders Navbar with Shop and Cart links", async () => {
    // Render the Navbar component inside BrowserRouter and ShopContext.Provider
    render(
      <BrowserRouter>
        <ShopContext.Provider value={mockContextValue}>
          <Navbar />
        </ShopContext.Provider>
      </BrowserRouter>
    );

    // Verify that the "Shop" link is present in the document
    expect(screen.getByText("Shop")).toBeInTheDocument();

    // Wait for the cart count to be updated
    await screen.findByText("3");
    // Verify that a link with the name "Cart" exists in the document
    expect(screen.getByRole("link", { name: "Cart" })).toBeInTheDocument();
  });

  // Test: Check if Navbar displays correct total cart item count
  test.skip("displays correct total cart item count", async () => {
    // Render the Navbar component with mock context
    render(
      <BrowserRouter>
        <ShopContext.Provider value={mockContextValue}>
          <Navbar />
        </ShopContext.Provider>
      </BrowserRouter>
    );

    // Verify that the cart item count is displayed correctly (expecting "3")
    expect(await screen.findByText("3")).toBeInTheDocument();
  });

  // Test: Check if clicking the profile icon opens the user profile dropdown (Skipped)
  test("shows user profile dropdown when clicking profile icon", async () => {
    // Render the Navbar component with mock context
    render(
      <BrowserRouter>
        <ShopContext.Provider value={mockContextValue}>
          <Navbar />
        </ShopContext.Provider>
      </BrowserRouter>
    );

    // Get profile icon (UserCircle)
    const profileIcon = screen.getByTestId("profile-icon");

    //Simulate a click event on the profile icon
    fireEvent.click(profileIcon);

    //Verify that the user's name ("John Doe") appears in the dropdown after clicking
    expect(await screen.findByText("John Doe")).toBeInTheDocument();
  });
});
