// Imports React along with useEffect and useState hooks
import React, { useEffect, useState } from "react";
// Import Axios for making HTTP requests
import axios from "axios";

// An `interface` in TypeScript is a way to define the structure of an object.
// Defines the structure of a Product object
interface Product {
  _id: string;
  productName: string;
  price: number;
  productImage: string;
}

// An `interface` in TypeScript is a way to define the structure of an object.
// Defines the structure of a CartItem object
interface CartItem {
  product: Product;
  quantity: number;
}

// An `interface` in TypeScript is a way to define the structure of an object.
// Defines the structure of the CartData object
interface CartData {
  userId: string;
  cartItems: CartItem[];
}

/**
 * Checkout Component
 *
 * This component is responsible for displaying the user's cart items and the total cart amount.
 * It:
 * 1. Fetches the cart items from the backend API.
 * 2. Fetches the total cart amount from the backend API.
 * 3. Displays each product in the cart, along with its price and quantity.
 * 4. Shows the total amount to be paid.
 * 5. Uses React hooks (`useState`, `useEffect`) to manage state and fetch data dynamically.
 * 6. Implements conditional rendering to handle the loading state when data is not yet available.
 */

//Define the Checkout component as a functional component
export const Checkout: React.FC = () => {
  // State to store cart data , initialized as null
  const [cartData, setCartData] = useState<CartData | null>(null);
  // State to store total cart amount , initialized as 0
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const userId: string = "65c96f8a1a2b4c001f3d8e9a";

  // Fetch cart data when component mounts or userId changes
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        // Send a GET request to fetch the cart items for the given userId
        const response = await axios.get<CartData>(
          `http://localhost:5000/api/products/products-in-cart?userId=${userId}`
        );

        // Update the cartData state with the retrieved data
        setCartData(response.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    //Call the function to fetch cart data
    fetchCartData();
  }, [userId]); // Dependency array ensures the function runs when userId changes

  // Fetch total cart amount when component mounts or userId changes
  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        // Send a GET request to fetch the total amount for the given userId
        const response = await axios.get<{ totalAmount: number }>(
          `http://localhost:5000/api/cart/totalAmount?userId=${userId}`
        );

        // Update the totalAmount state with the retrieved value, defaulting to 0 if undefined
        setTotalAmount(response.data.totalAmount || 0);
      } catch (error) {
        console.error("Error fetching total amount:", error);
      }
    };

    //Call the function to fetch total cart amount
    fetchTotalAmount();
  }, [userId]); // Dependency array ensures the function runs when userId changes

  return (
    <div>
      <h1>Checkout Page</h1>
      {/* Conditional rendering: Display cart details if available, else show a loading message */}
      {cartData ? (
        <div>
          {/* Display the user ID for reference */}
          <h2>Cart for User: {cartData.userId}</h2>
          {/* Loop through cart items and display product details */}
          {cartData.cartItems.map((item, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              {/* Display product image */}
              <img
                src={item.product.productImage}
                alt={item.product.productName}
                width="150"
              />
              {/* Display product name */}
              <h3>{item.product.productName}</h3>
              {/* Display product price */}
              <p>Price: Rs {item.product.price}</p>
              {/* Display quantity of the product in the cart */}
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}

          {/* Display total cart amount */}
          <h2>Total Amount: Rs {totalAmount}</h2>
        </div>
      ) : (
        <p>Loading cart items...</p>
      )}
    </div>
  );
};

export default Checkout;
