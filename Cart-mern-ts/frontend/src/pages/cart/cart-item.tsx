// Import React and the useContext hook to access context values
import React, { useContext } from "react";
// Import the ShopContext to access global state
import { ShopContext } from "../../context/shop-context";

// An `interface` in TypeScript is a way to define the structure of an object.
// Define an interface to represent the structure of a cart item
interface CartItemData {
  _id: string;
  productName: string;
  price: number;
  productImage: string;
}

// An `interface` in TypeScript is a way to define the structure of an object.
// Define an interface to represent the props for a CartItem component
interface CartItemProps {
  data: CartItemData; // A single cart item, adhering to the CartItemData structure
}

// An `interface` in TypeScript is a way to define the structure of an object.
//Define an interface for the ShopContextType , which represents the shopping cart context
interface ShopContextType {
  cartItems: { [key: string]: number }; // An object where keys are product IDs and values are quantities
  addToCart: (id: string) => void; // Function to add an item to the cart, taking an item ID as a parameter
  removeFromCart: (id: string) => void; // Function to remove an item from the cart, taking an item ID as a parameter
}

/**
 * CartItem Component
 *
 * This component represents a single item in the shopping cart. It displays the product's image, name,
 * price, and allows the user to adjust the quantity using increment and decrement buttons.
 *
 * Props:
 * - data: An object containing product details (_id, productName, price, productImage)
 *
 * Functionality:
 * - Uses the ShopContext to access cart-related functions and state.
 * - Displays product details and allows users to modify the quantity in the cart.
 * - Ensures that the ShopContext is properly used within the provider.
 *
 * Returns:
 * - A JSX structure representing the cart item with controls to update its quantity.
 */
export const CartItem: React.FC<CartItemProps> = ({ data }) => {
  // Destructure product details from the passed data prop
  const { _id, productName, price, productImage } = data;

  // Retrieve the ShopContext value using useContext
  // This allows the component to access shared state and functions like cartItems, addToCart, and removeFromCart
  // Type assertion ensures that the returned value is of type ShopContextType or null (if the provider is missing)
  const context = useContext(ShopContext) as ShopContextType | null;

  // Ensure that the component is used within the ShopContextProvider
  if (!context) {
    throw new Error("ShopContext must be used within a ShopContextProvider");
  }

  // Destructure cart-related functions and state from the context
  const { addToCart, removeFromCart, cartItems } = context;

  // Get item quantity in cart
  const cartItemAmount: number = cartItems[_id] || 0;

  return (
    //Main container for the cart item
    <div className="cartItem">
      {/* Display Product image */}
      <img src={productImage} alt={productName} />
      {/*Description container*/}
      <div className="description">
        {/* Display product name  */}
        <p>
          <b>{productName}</b>
        </p>
        {/* Display product price */}
        <p>Rs {price}</p>

        {/* Quantity control buttons */}
        <div className="countHandler">
          {/* Decrease item quantity when clicked */}
          <button onClick={() => removeFromCart(_id)}>-</button>
          {/* Display the current quantity of the item in the cart */}
          <span>{cartItemAmount}</span>
          {/* Increase item quantity when clicked */}
          <button onClick={() => addToCart(_id)}>+</button>
        </div>
      </div>
    </div>
  );
};
