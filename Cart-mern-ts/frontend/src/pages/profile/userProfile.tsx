import React, { useEffect, useState } from "react";
import "./userProfile.css";
import axios from "axios";

// An `interface` in TypeScript is a way to define the structure of an object.
interface User {
  userId: string;
}

// An `interface` in TypeScript is a way to define the structure of an object.
interface UserProfileProps {
  user?: User; // user is optional
  getTotalCartItems: () => Promise<number>; // Function returns a Promise resolving to a number
}

/**
 * UserProfile Component
 *
 * This component displays the user's profile information, including their ID,
 * the total number of items in their cart, and the total cart amount.
 *
 * Props:
 * - user: An object containing the user's details (userId)
 * - getTotalCartItems: A function that returns the total number of items in the cart
 *
 * Functionality:
 * - Fetches the total number of items in the cart using the provided function.
 * - Fetches the total cart amount from the backend API.
 * - Displays the user's profile information.
 *
 * Returns:
 * - A user profile section displaying the user's ID, total items in the cart, and total cart amount.
 */
const UserProfile: React.FC<UserProfileProps> = ({
  user,
  getTotalCartItems,
}) => {
  //State to store total number of items in the cart
  const [totalItems, setTotalItems] = useState<number>(0);
  //State to store the total cart amount
  const [totalAmount, setTotalAmount] = useState<number>(0);

  // This useEffect fetches the total number of items in the cart when the component mounts
  // or when the getTotalCartItems function changes. It defines an async function fetchTotalItems,
  // which retrieves the total cart items and updates the totalItems state.
  useEffect(() => {
    const fetchTotalItems = async () => {
      // Calls the function to get total cart items
      const count = await getTotalCartItems();
      // Updates state with the fetched count
      setTotalItems(count);
    };
    fetchTotalItems();
  }, [getTotalCartItems]); // Re-run when getTotalCartItems function changes

  //Function to fetch the total cart amount from the server
  const fetchTotalCartAmount = async () => {
    if (!user) return; // If no user is available, exit function

    try {
      // Sends a GET request to retrieve the total cart amount for the given user ID
      const response = await axios.get<{ totalAmount: number }>(
        `http://localhost:5000/api/cart/totalAmount?userId=${user.userId}`
      );
      setTotalAmount(response.data.totalAmount || 0); // Updates the state with the fetched amount
    } catch (error) {
      console.error("Error fetching total cart amount:", error);
    }
  };

  // This useEffect runs whenever the user state changes.
  // If a user exists, it calls fetchTotalCartAmount to retrieve and update the total cart amount.
  useEffect(() => {
    if (user) {
      fetchTotalCartAmount();
    }
  }, [user]);

  return (
    <div className="user-profile">
      {/* Displays user ID */}
      <p>
        <strong>UserId: {user?.userId || "Guest"}</strong>
      </p>
      {/* Displays total number of items in the cart */}
      <p>Total Items in Cart: {totalItems}</p>
      {/* Displays total cart amount */}
      <p>Total Cart Amount: Rs {totalAmount}</p>
    </div>
  );
};

export default UserProfile;
