import React, { useContext, useEffect, useState } from "react";
// Importing Link from react-router-dom to navigate between routes
import { Link } from "react-router-dom";
// Importing icons from phosphor-react for shopping cart and user profile
import { ShoppingCart, UserCircle } from "phosphor-react";
// Importing the ShopContext to access global state
import { ShopContext } from "../context/shop-context";
import "./navbar.css";

// Dynamically imports the UserProfile component using React.lazy() to avoid circular dependency
const UserProfile = React.lazy(() => import("../pages/profile/userProfile"));

/*
-This Navbar component renders a navigation bar with links to the shop and cart pages.  
-It also displays the total number of items in the cart and a user profile icon. 
-Clicking the user profile icon toggles a dropdown containing user details.
-The component fetches cart details from context and listens for outside clicks to close the profile dropdown. 
React.FC
- React.FC (React Functional Component) is a TypeScript generic type that ensures 
- the component follows React’s functional component structure. It provides type 
- checking for props and includes an implicit children prop by default.
*/
export const Navbar: React.FC = () => {
  //State to control the visibility of the user profile dropdown
  const [showProfile, setShowProfile] = useState<boolean>(false);

  //State to track the total number of items in the cart
  const [totalItems, setTotalItems] = useState<number>(0);

  // Extracts user data, cart items, and a function to get the total cart items from ShopContext
  // Provides default values in case useContext returns null
  const { user, getTotalCartItems, cartItems } = useContext(ShopContext) || {
    user: null,
    getTotalCartItems: async () => 0,
    cartItems: [],
  };
  // Effect to update total cart items whenever cartItems change
  // useEffect(() => {
  //   const fetchTotalItems = async () => {
  //     // Calls the context function to get the total number of items in the cart
  //     const count = await getTotalCartItems();
  //     // Updates the totalItems state with the fetched count
  //     setTotalItems(count);
  //   };
  //   fetchTotalItems();
  //   // Runs the effect when cartItems or getTotalCartItems change
  // }, [cartItems, getTotalCartItems]);

  useEffect(() => {
    const fetchTotalItems = async () => {
      const count = await getTotalCartItems();

      // Ensure the state update is wrapped inside act() during tests
      if (process.env.NODE_ENV === "test") {
        await import("@testing-library/react").then(({ act }) =>
          act(() => setTotalItems(count))
        );
      } else {
        setTotalItems(count);
      }
    };

    fetchTotalItems();
  }, [cartItems, getTotalCartItems]);

  // Effect to handle closing the user profile dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Checks if the clicked element is outside the .profile-container
      if (!(event.target as HTMLElement).closest(".profile-container")) {
        setShowProfile(false); // Hides the profile dropdown
      }
    };

    // Adds an event listener to detect outside clicks
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Removes the event listener when the component unmounts
      document.removeEventListener("click", handleClickOutside);
    };
  }, []); // An empty dependency array `[]` means this effect runs only once when the component mounts.

  return (
    //Main navbar container
    <div className="navbar">
      <div className="links">
        {/* Link to the shop page */}
        <Link to="/">Shop</Link>
        {/* Link to the cart page with a cart icon*/}
        <Link to="/cart" aria-label="Cart">
          <ShoppingCart size={32} />
          {/* Displays the total cart items count if it's greater than 0 */}
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </Link>
      </div>

      {/* User profile icon and dropdown */}
      <div className="profile-container">
        {/* User profile icon, toggles the dropdown on click */}
        <UserCircle
          size={32}
          data-testid="profile-icon"
          onClick={() => {
            //console.log("User profile icon clicked");

            setShowProfile(!showProfile); // Toggles profile visibility
          }}
        />
        {/* Conditionally renders the user profile dropdown if `showProfile` is true and `user` exists */}
        {showProfile && user && (
          <UserProfile
            user={user as any} //Passes user data to the profile component
            getTotalCartItems={getTotalCartItems} //passes cart function to the profile
          />
        )}
      </div>
    </div>
  );
};
