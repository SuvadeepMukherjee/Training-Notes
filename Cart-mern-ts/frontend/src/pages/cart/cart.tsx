// Import React and hooks useContext, useState, and useEffect for managing state and side effects
import React, { useContext, useState, useEffect } from "react";
// Import axios for making HTTP requests
import axios from "axios";
// Import the ShopContext to access the cart state and actions
import { ShopContext } from "../../context/shop-context";
// Import the CartItem component, which represents an individual cart item
import { CartItem } from "./cart-item";
import "./cart.css";
// Import useNavigate from react-router-dom to  navigate between pages
import { useNavigate } from "react-router-dom";

// An `interface` in TypeScript is a way to define the structure of an object.
// Defines a TypeScript interface named `Product` to describe the structure of a product object
interface Product {
  _id: string;
  productName: string;
  price: number;
  productImage: string;
}
// An `interface` in TypeScript is a way to define the structure of an object.
// Defines a TypeScript interface named `ShopContextType` to specify the structure of the shopping cart context
interface ShopContextType {
  cartItems: { [key: string]: number }; // An object where the key is a product ID (string) and the value is the quantity of that product in the cart
  getTotalCartAmount: () => Promise<number>; // A function that returns a promise resolving to the total cart amount (sum of prices)
}

/**
 * The `Cart` component displays the items in the user's shopping cart.
 * It retrieves product data from the backend and calculates the total amount.
 * The user can navigate to checkout or continue shopping.
 *
 * This component:
 * - Fetches the cart items from the context
 * - Retrieves product details from the backend
 * - Computes the total price of items in the cart
 * - Displays the cart items dynamically
 * - Provides navigation buttons for checkout and shopping
 *
 * Returns:
 * - A list of cart items if the cart has products
 * - A subtotal amount if items exist
 * - Checkout and Continue Shopping buttons
 * - A message indicating an empty cart if no items are present
 */
export const Cart: React.FC = () => {
  // Access the shopping cart context and explicitly define its type
  const context = useContext(ShopContext) as ShopContextType | null;

  // Ensure that the ShopContext is used within a ShopContextProvider
  if (!context) {
    throw new Error("ShopContext must be used within a ShopContextProvider");
  }

  // Destructure cart-related values from context
  const { cartItems, getTotalCartAmount } = context;

  // State to store the list of products retrieved from the backend
  const [products, setProducts] = useState<Product[]>([]);

  // State to store the total amount of items in the cart
  const [totalAmount, setTotalAmount] = useState<number>(0);

  // Hook to enable navigation between pages
  const navigate = useNavigate();

  //Fetch total cart amount when getTotalCartAmount changes
  useEffect(() => {
    const fetchTotalAmount = async () => {
      // Call the function to get the total amount
      const amount = await getTotalCartAmount();
      // Update state with the fetched total amount
      setTotalAmount(amount);
    };
    fetchTotalAmount();
  }, [getTotalCartAmount]); // Re-run effect when getTotalCartAmount reference changes

  // Fetch all products from the backend when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Send a GET request to fetch the product list
        const response = await axios.get<Product[]>(
          "http://localhost:5000/api/products"
        );
        /*
        Explanation:
          - This line makes an asynchronous HTTP GET request to the API endpoint /api/products using Axios.
          - <Product[]> is a generic type, ensuring the response is an array of Product objects.
          - axios.get<Product[]>() enforces type safety, meaning the response must follow the Product interface.
          - The returned response contains the fetched product data, which can be used to update the application state.
        */

        // Update the products state with the fetched data
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []); // Runs only once when the component mounts

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
        {/* Display the cart title */}
      </div>
      <div className="cartItems">
        {/* Filter products to show only those that are in the cart */}
        {products
          .filter((product) => cartItems[product._id] > 0)
          .map((product) => (
            // Render a CartItem component for each product in the cart
            <CartItem key={product._id} data={product} />
          ))}
      </div>
      {/* Display checkout options if the cart contains items */}
      {totalAmount > 0 ? (
        <div className="checkout">
          <p>Subtotal: Rs {totalAmount}</p>
          {/* Button to navigate back to the shop */}
          <button onClick={() => navigate("/")}>Continue Shopping</button>
          {/* Button to navigate to the checkout page */}
          <button onClick={() => navigate("/checkout")}>Checkout</button>
        </div>
      ) : (
        // Show a message if the cart is empty
        <h1>Your Cart is Empty</h1>
      )}
    </div>
  );
};
