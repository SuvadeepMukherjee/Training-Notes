// Import the React library along with specific hooks and types:
// - createContext: to create a new Context for managing state across components.
// - useState: to manage state in functional components.
// - useEffect: to perform side effects in functional components.
// - ReactNode: a type representing any React renderable element.
import React, { createContext, useState, useEffect, ReactNode } from "react";
//Import the axios library for making HTTP requests
import axios from "axios";

// An interface in TypeScript is a way to define the structure of an object.
// This interface CartItems defines the structure of an object
// where the keys are productId values (strings) and the values are numbers
// representing the quantity of each product in the cart.
// The [productId: string]: number; syntax is called  index signature,
// which means this object can have any number of properties where the key is a string
// (representing the product ID), and the value is a number (representing the quantity of that product).
interface CartItems {
  [productId: string]: number;
}

// An interface in TypeScript is a way to define the structure of an object.
// This interface User defines the structure of a user object in TypeScript.
interface User {
  _id: string;
  name: string;
  email: string;
  userId?: string; // Optional property
}

// An interface in TypeScript is a way to define the structure of an object.
// This interface ShopContextType defines the structure of the shopping context,
// ensuring that any object following this interface provides the necessary properties and functions.
interface ShopContextType {
  user: User | null; // User object or null
  cartItems: CartItems; // Cart items
  addToCart: (itemId: string) => Promise<void>;
  // Function to add an item to the cart. It takes a string itemId and returns a Promise.
  removeFromCart: (itemId: string) => Promise<void>;
  // Function to remove an item from the cart. Takes a string itemId and returns a Promise.
  getTotalCartAmount: () => Promise<number>;
  // Function to get the total amount of the cart. Returns a Promise with a number.
  getTotalCartItems: () => Promise<number>;
  // Function to get the total number of items in the cart. Returns a Promise with a number.
}

// Creates a React context named ShopContext with a default value of null
// The | (union type) allows ShopContext to be either ShopContextType or null.
export const ShopContext = createContext<ShopContextType | null>(null);

// An interface in TypeScript is a way to define the structure of an object.
// Defines an interface for the props that the ShopContextProvider component will accept.
// This ensures that ShopContextProvider always receives a children prop, which represents
// the React components nested inside it.
interface ShopContextProviderProps {
  children: ReactNode;
}

//Defines the ShopContextProvider component as a React functional component(FC)
//It accepts ShopContextProvderProps , ensuring it has a children prop of type ReactNode.
export const ShopContextProvider: React.FC<ShopContextProviderProps> = ({
  children,
}) => {
  // State to manage cart items, initialized as an empty object.
  // The cartItems state holds a mapping of product IDs to their quantities.
  const [cartItems, setCartItems] = useState<CartItems>({});

  // State to manage the authenticated user, initialized as null.
  // user stores the logged-in user's details, while setUser updates it.
  const [user, setUser] = useState<User | null>(null);

  const userId: string = "65c96f8a1a2b4c001f3d8e9a";

  const fetchCartItems = async () => {
    try {
      // Sends a GET request to fetch cart items for the specified userId
      const response = await axios.get<{
        items: { productId: string; quantity: number }[]; //Defines the expected response structure
      }>(`http://localhost:5000/api/cart/${userId}`); // Sends a GET request to fetch cart data for the specified userId

      // Transform API response into key-value pair (productId -> quantity)
      const cartData: CartItems = response.data.items.reduce((acc, item) => {
        if (item.productId) {
          acc[item.productId] = item.quantity; //Maps product ID to its quantity
        }
        return acc; //Returns the updated accumulator
      }, {} as CartItems); //Initializes acc as an empty object of type CartItems

      // Updates the state with the fetched cart data
      setCartItems(cartData);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Fetch total number of items in the cart
  const getTotalCartItems = async (): Promise<number> => {
    try {
      //Sends a GET reqest to the API to retreive the total number of items in the cart for the given userId
      const response = await axios.get<{ totalItems: number }>( //Defines the expected response structure (an object containing totalItems as a number)
        `http://localhost:5000/api/cart/numberCart?userId=${userId}`
      );

      //Returns the total number of items in the cart
      return response.data.totalItems || 0;
    } catch (error) {
      console.error("Error fetching cart count:", error);
      return 0;
    }
  };

  const getTotalCartAmount = async (): Promise<number> => {
    try {
      // Sends a GET request to the API to retrieve the total cart amount for the given userId
      const response = await axios.get<{ totalAmount: number }>( // Defines the expected response structure (an object containing totalAmount as a number)
        `http://localhost:5000/api/cart/totalAmount?userId=${userId}` // Sends a GET request with userId as a query parameter
      );

      // Returns the total cart amount
      return response.data.totalAmount || 0;
    } catch (error) {
      console.error("Error fetching total cart amount:", error);
      return 0;
    }
  };

  // Add an item to the cart
  const addToCart = async (itemId: string) => {
    try {
      const obj = { userId, productId: itemId, quantity: 1 };

      // Sends a POST request to the API to add the specified item to the cart
      await axios.post("http://localhost:5000/api/cart/add", obj);

      // Update cart state
      setCartItems((prev) => ({
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1,
      }));
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  // Remove an item from the cart
  const removeFromCart = async (itemId: string) => {
    try {
      const obj = { userId, productId: itemId, quantity: 1 };
      // Sends a DELETE request to the API to remove the specified item from the cart
      await axios.delete("http://localhost:5000/api/cart/remove", {
        data: obj,
      });

      // Update cart state after succesful removal
      setCartItems((prev) => {
        const updatedCart = { ...prev }; //Creates a copy of the previous cart state

        // If the item is not in the cart, show an alert and return previous state
        if (!updatedCart[itemId]) {
          alert("This item is already at 0 and cannot be reduced further.");
          return prev;
        }

        // If the item has only 1 quantity, remove it completely
        if (updatedCart[itemId] === 1) {
          alert("This item is already at 1. Removing it completely.");
          delete updatedCart[itemId];
        } else {
          // Otherwise, decrement the quantity of the item
          updatedCart[itemId] -= 1;
        }
        return updatedCart; //Returns the updated cart state
      });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  //This useEffect fetches the user's profile data from the API when the component mounts.
  // It defines an asynchronous function fetchUser, which makes a GET request to retrieve user details using userId.
  // If the request is successful, it updates the state with the fetched user data.
  // If the request fails, it logs an error message to the console.
  // The empty dependency array [] ensures that this effect runs only once when the component first renders.
  useEffect(() => {
    //Defines an asynchronous function to fetch user data
    const fetchUser = async () => {
      try {
        //Sends a GET request to the API to fetch user profile data using userId
        const response = await axios.get<User>(
          `http://localhost:5000/api/user/profile/${userId}`
        );
        // console.log("User data received:", response.data);

        //Updates the user state wuth the fetched data
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    // Calls the fetchUser function to retrieve user data when the component mounts
    fetchUser();
  }, []); // The empty dependency array [] ensures this effect runs only once, after the initial render

  // This useEffect triggers the fetchCartItems function when the component mounts
  //Since the dependency array is empty [], this effect runs only once after the initial render.
  useEffect(() => {
    //Calls the fetchCartItems function to retrieve cart items from the API
    fetchCartItems();
  }, []); //Runs only once when the component first mounts

  // Context value object that holds the state and functions related to the shopping cart and user.
  // This will be provided to the ShopContext so that child components can access these values and functions.
  const contextValue: ShopContextType = {
    user,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  // Returns the ShopContext.Provider component to provide the context value to its children.
  // This allows any component within the provider's scope to access the shared cart and user-related data.
  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};
