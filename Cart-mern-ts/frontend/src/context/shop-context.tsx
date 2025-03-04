import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

// Define Product type
interface Product {
  _id: string;
  productName: string;
  price: number;
  productImage: string;
}

// Define Cart Items type (key-value pair: productId -> quantity)
interface CartItems {
  [productId: string]: number;
}

// Define User type
interface User {
  _id: string;
  name: string;
  email: string;
  userId?: string;
}

// Define ShopContextType
interface ShopContextType {
  user: User | null;
  cartItems: CartItems;
  addToCart: (itemId: string) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  getTotalCartAmount: () => Promise<number>;
  getTotalCartItems: () => Promise<number>;
}

// Create ShopContext with default value as null
export const ShopContext = createContext<ShopContextType | null>(null);

// Define props for the provider component
interface ShopContextProviderProps {
  children: ReactNode;
}

// ShopContextProvider component
export const ShopContextProvider: React.FC<ShopContextProviderProps> = ({
  children,
}) => {
  // State to store cart items
  const [cartItems, setCartItems] = useState<CartItems>({});
  // State to store user information (initially null)
  const [user, setUser] = useState<User | null>(null);

  const userId: string = "65c96f8a1a2b4c001f3d8e9a";

  // Fetch cart items from the server
  const fetchCartItems = async () => {
    try {
      const response = await axios.get<{
        items: { productId: string; quantity: number }[];
      }>(`http://localhost:5000/api/cart/${userId}`);

      // Transform API response into key-value pair (productId -> quantity)
      const cartData: CartItems = response.data.items.reduce((acc, item) => {
        if (item.productId) {
          acc[item.productId] = item.quantity;
        }
        return acc;
      }, {} as CartItems);

      // Update cart state
      setCartItems(cartData);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Fetch total number of items in the cart
  const getTotalCartItems = async (): Promise<number> => {
    try {
      const response = await axios.get<{ totalItems: number }>(
        `http://localhost:5000/api/cart/numberCart?userId=${userId}`
      );
      return response.data.totalItems || 0;
    } catch (error) {
      console.error("Error fetching cart count:", error);
      return 0;
    }
  };

  // Fetch total cart amount
  const getTotalCartAmount = async (): Promise<number> => {
    try {
      const response = await axios.get<{ totalAmount: number }>(
        `http://localhost:5000/api/cart/totalAmount?userId=${userId}`
      );
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
      await axios.delete("http://localhost:5000/api/cart/remove", {
        data: obj,
      });

      // Update cart state
      setCartItems((prev) => {
        const updatedCart = { ...prev };

        if (!updatedCart[itemId]) {
          alert("This item is already at 0 and cannot be reduced further.");
          return prev;
        }
        if (updatedCart[itemId] === 1) {
          alert("This item is already at 1. Removing it completely.");
          delete updatedCart[itemId];
        } else {
          updatedCart[itemId] -= 1;
        }
        return updatedCart;
      });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Fetch user profile data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<User>(
          `http://localhost:5000/api/user/profile/${userId}`
        );
        console.log("User data received:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUser();
  }, []);

  // Fetch cart items on mount
  useEffect(() => {
    fetchCartItems();
  }, []);

  // Context value
  const contextValue: ShopContextType = {
    user,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};
