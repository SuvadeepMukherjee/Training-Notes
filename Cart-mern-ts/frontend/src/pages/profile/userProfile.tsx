import React, { useEffect, useState } from "react";
import "./userProfile.css";
import axios from "axios";

// Define type for User
interface User {
  userId: string;
}

// Define props for UserProfile component
interface UserProfileProps {
  user?: User; // user is optional
  //getTotalCartItems: () => Promise<number>; // Function returns a Promise resolving to a number
}

const UserProfile: React.FC<UserProfileProps> = ({
  user,
  //getTotalCartItems,
}) => {
  // Initializes totalItems state to 0
  const [totalItems, setTotalItems] = useState<number>(0);
  // Initializes totalAmount state to 0
  const [totalAmount, setTotalAmount] = useState<number>(0);

  // useEffect(() => {
  //   const fetchTotalItems = async () => {
  //     const count = await getTotalCartItems();
  //     setTotalItems(count);
  //   };
  //   fetchTotalItems();
  // }, [getTotalCartItems]);

  // Function to fetch the total cart amount from the server
  // const fetchTotalCartAmount = async () => {
  //   if (!user) return;

  //   try {
  //     const response = await axios.get<{ totalAmount: number }>(
  //       `http://localhost:5000/api/cart/totalAmount?userId=${user.userId}`
  //     );
  //     setTotalAmount(response.data.totalAmount || 0);
  //   } catch (error) {
  //     console.error("Error fetching total cart amount:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (user) {
  //     fetchTotalCartAmount();
  //   }
  // }, [user]);

  return (
    <div className="user-profile">
      <p>
        <strong>UserId: {user?.userId || "Guest"}</strong>
      </p>
      {/* <p>Total Items in Cart: {totalItems}</p>
      <p>Total Cart Amount: Rs {totalAmount}</p> */}
    </div>
  );
};

export default UserProfile;
