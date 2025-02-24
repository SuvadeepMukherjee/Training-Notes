import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, UserCircle } from "phosphor-react";

//import { ShopContext } from "../context/shop-context";
import "./navbar.css";

// Define types for User and Context
interface User {
  id: string;
  name: string;
  email: string;
  // Add other user-related properties as needed
}

// interface ShopContextType {
//   user: User | null;
//   getTotalCartItems: () => Promise<number>;
//   cartItems: Record<string, number>;
// }

// Lazy load the UserProfile component to avoid circular dependency
//const UserProfile = React.lazy(() => import("../pages/profile/userProfile"));

// Define props for UserProfile
interface UserProfileProps {
  user: User | null;
  getTotalCartItems: () => Promise<number>;
}

export const Navbar: React.FC = () => {
  // Access user and cart-related functions from ShopContext
  //   const { user, getTotalCartItems, cartItems } =
  //     useContext<ShopContextType>(ShopContext);

  // State to track the total number of items in the cart
  const [totalItems, setTotalItems] = useState<number>(0);

  // State to control the visibility of the user profile dropdown
  const [showProfile, setShowProfile] = useState<boolean>(false);

  // Effect to update total cart items whenever cartItems change
  //   useEffect(() => {
  //     const fetchTotalItems = async () => {
  //       const count = await getTotalCartItems();
  //       setTotalItems(count);
  //     };
  //     fetchTotalItems();
  //   }, [cartItems]);

  //   useEffect(() => {
  //     const handleClickOutside = (event: MouseEvent) => {
  //       if (
  //         (event.target as HTMLElement).closest(".profile-container") === null
  //       ) {
  //         setShowProfile(false);
  //       }
  //     };
  //     document.addEventListener("click", handleClickOutside);
  //     return () => {
  //       document.removeEventListener("click", handleClickOutside);
  //     };
  //   }, []);

  return (
    <div className="navbar">
      <div className="links">
        <Link to="/">Shop</Link>

        <Link to="/cart">
          <ShoppingCart size={32} />
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </Link>
      </div>

      <div className="profile-container">
        <UserCircle size={32} onClick={() => setShowProfile(!showProfile)} />
        {/* {showProfile && (
           <UserProfile user={user} getTotalCartItems={getTotalCartItems} />
        )} */}
      </div>
    </div>
  );
};
