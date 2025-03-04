import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create a new context called ShopContext and initialize it with a default value of null
export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  //State to store cart items
  const [cartItems, setCartItems] = useState({});
  //State to track the total number of items in the cart
  const [totalItems, setTotalItems] = useState(0);
  //State to store user information(initially null)
  const [user, setUser] = useState(null);
  const userId = "65c96f8a1a2b4c001f3d8e9a";

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/cart/${userId}`
      );

      // Transform the API response into a key-value pair object where
      // productId is the key and quantity is the value
      const cartData = response.data.items.reduce((acc, item) => {
        if (item.productId) {
          acc[item.productId] = item.quantity;
        }
        return acc;
      }, {});

      // Update the state with the formatted cart data
      setCartItems(cartData);

      // Fetch and update the total number of items in the cart
      fetchTotalCartItems();
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const fetchTotalCartItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/cart/numberCart?userId=${userId}`
      );
      // Update the totalItems state with the retrieved value
      setTotalItems(response.data.totalItems || 0);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  // useEffect hook to fetch cart items when the component mounts
  useEffect(() => {
    fetchCartItems();
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  //itemId is the product ID of the item being added to the cart(passed as an argument when calling addToCart)
  const addToCart = async (itemId) => {
    try {
      const obj = { userId, productId: itemId, quantity: 1 };

      await axios.post("http://localhost:5000/api/cart/add", obj);

      //find the object then update it
      // Update the cartItems state:
      // - Copy previous cart items
      // - Increment the quantity for the added product (or set to 1 if it's new)
      setCartItems((prev) => ({
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1,
      }));
      //console.log("fetchCartItems  working ", cartItems);
      // Fetch and update the total cart item count
      fetchTotalCartItems();
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  //itemId is the product ID of the item being added to the cart(passed as an argument when calling addToCart)
  //   const removeFromCart = async (itemId) => {
  //     try {
  //       const obj = { userId, productId: itemId, quantity: 1 };
  //       await axios.delete("http://localhost:5000/api/cart/remove", {
  //         data: obj,
  //       });
  //       // Update the cartItems state
  //       setCartItems((prev) => {
  //         // Copy previous cart state
  //         const updatedCart = { ...prev };

  //         // If the item is not found in the cart, alert the user and return the same state
  //         if (!updatedCart[itemId]) {
  //           alert("This item is already at 0 and cannot be reduced further.");
  //           return prev; // Prevents state update
  //         }
  //         // If the item quantity is 1, remove it from the cart completely
  //         if (updatedCart[itemId] === 1) {
  //           alert("This item is already at 1. Removing it completely.");
  //           delete updatedCart[itemId]; // Remove item from  state
  //         } else {
  //           updatedCart[itemId] -= 1; // Decrease quantity normally
  //         }
  //         // Fetch and update the total cart item count
  //         fetchTotalCartItems();

  //         return updatedCart;
  //       });
  //     } catch (error) {
  //       console.error("Error removing item from cart:", error);
  //     }
  //   };

  // const getTotalCartAmount = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:5000/api/cart/totalAmount?userId=${userId}`
  //     );
  //     return response.data.totalAmount || 0;
  //   } catch (error) {
  //     console.error("Error fetching total cart amount:", error);
  //     return 0;
  //   }
  // };

  const getTotalCartItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/cart/numberCart?userId=${userId}`
      );
      return response.data.totalItems || 0;
    } catch (error) {
      console.error("Error fetching cart count:", error);
      return 0;
    }
  };

  //useEffect hook to fetch user profile data when the component mounts
  useEffect(() => {
    //asynchronous function to fetch user profile data
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/profile/${userId}`
        );
        console.log("response received from user controller");

        // Set the fetched user data into state (user)
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    // Call the fetchUser function to initiate the request
    fetchUser();
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  // Define the context value that will be shared with components using this context
  const contextValue = {
    user,
    // userId,
    cartItems,
    addToCart,
    // removeFromCart,
    // getTotalCartAmount,
    getTotalCartItems,
    // fetchCartItems,
  };

  // Wrap the children components inside the ShopContext.Provider to provide context values
  return (
    // Provide the context value to all components that consume the ShopContext
    <ShopContext.Provider value={contextValue}>
      {/* Render the child components passed to the ShopContextProvider */}
      {props.children}
    </ShopContext.Provider>
  );
};
