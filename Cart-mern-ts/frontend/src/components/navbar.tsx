import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, UserCircle } from "phosphor-react";
import { ShopContext } from "../context/shop-context";
import "./navbar.css";

const UserProfile = React.lazy(() => import("../pages/profile/userProfile"));

export const Navbar: React.FC = () => {
  //State to control the visibility of the user profile dropdown
  const [showProfile, setShowProfile] = useState<boolean>(false);

  const { user, getTotalCartItems } = useContext(ShopContext) || {
    user: null,
    getTotalCartItems: async () => 0,
  };

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
        <Link to="/cart"></Link>
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
