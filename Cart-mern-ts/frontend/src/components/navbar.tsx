import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, UserCircle } from "phosphor-react";
import { ShopContext } from "../context/shop-context";
import "./navbar.css";

const UserProfile = React.lazy(() => import("../pages/profile/userProfile"));

export const Navbar: React.FC = () => {
  //State to control the visibility of the user profile dropdown
  const [showProfile, setShowProfile] = useState<boolean>(false);

  //State to track the total number of items in the cart
  const [totalItems, setTotalItems] = useState<number>(0);

  const { user, getTotalCartItems, cartItems } = useContext(ShopContext) || {
    user: null,
    getTotalCartItems: async () => 0,
    cartItems: [],
  };
  // Effect to update total cart items whenever cartItems change
  useEffect(() => {
    const fetchTotalItems = async () => {
      // Get the total item count from the context
      const count = await getTotalCartItems();
      // Update state with the fetched count
      setTotalItems(count);
    };
    fetchTotalItems();
    // Re-run the effect when cartItems change
  }, [cartItems]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".profile-container")) {
        setShowProfile(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      <div className="links">
        <Link to="/">Shop</Link>
        <Link to="/cart">
          <ShoppingCart size={32} />
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </Link>
      </div>
      <div className="profile-container">
        <UserCircle
          size={32}
          onClick={() => {
            console.log("User profile icon clicked");

            setShowProfile(!showProfile);
          }}
        />
        {showProfile && user !== null && (
          <UserProfile user={user} getTotalCartItems={getTotalCartItems} />
        )}
      </div>
    </div>
  );
};
