import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, UserCircle } from "phosphor-react";
import { ShopContext } from "../context/shop-context";
import "./navbar.css";

const UserProfile = React.lazy(() => import("../pages/profile/userProfile"));

export const Navbar: React.FC = () => {
  //State to control the visibility of the user profile dropdown
  const [showProfile, setShowProfile] = useState<boolean>(false);

  const { user } = useContext(ShopContext) || { user: null };

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
        {showProfile && user !== null && <UserProfile user={user} />}
      </div>
    </div>
  );
};

// import React, { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { ShoppingCart, UserCircle } from "phosphor-react";

// import { ShopContext } from "../context/shop-context";
// import "./navbar.css";

// const UserProfile = React.lazy(() => import("../pages/profile/userProfile"));

// export const Navbar: React.FC = () => {
//   // Access user and cart-related functions from ShopContext
//   const { user, getTotalCartItems, cartItems } = useContext(ShopContext);

//   // State to track the total number of items in the cart
//   const [totalItems, setTotalItems] = useState<number>(0);

//   // State to control the visibility of the user profile dropdown
//   const [showProfile, setShowProfile] = useState<boolean>(false);

//   // Effect to update total cart items whenever cartItems change
//   useEffect(() => {
//     const fetchTotalItems = async () => {
//       const count = await getTotalCartItems();
//       setTotalItems(count);
//     };
//     fetchTotalItems();
//   }, [cartItems, getTotalCartItems]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (!(event.target as HTMLElement).closest(".profile-container")) {
//         setShowProfile(false);
//       }
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="navbar">
//       <div className="links">
//         <Link to="/">Shop</Link>
//         <Link to="/cart">
//           <ShoppingCart size={32} />
//           {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
//         </Link>
//       </div>

//       <div className="profile-container">
//         <UserCircle size={32} onClick={() => setShowProfile(!showProfile)} />
//         {showProfile && <UserProfile user={user} getTotalCartItems={getTotalCartItems} />}
//       </div>
//     </div>
//   );
// };
