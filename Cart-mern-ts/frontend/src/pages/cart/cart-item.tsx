import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

// Define the expected shape of the cart item data
interface CartItemData {
  _id: string;
  productName: string;
  price: number;
  productImage: string;
}

// Define props type for CartItem component
interface CartItemProps {
  data: CartItemData;
}

// Define the ShopContext type
interface ShopContextType {
  cartItems: { [key: string]: number };
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
}

// CartItem component
export const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const { _id, productName, price, productImage } = data;

  // Use context with explicit type
  const context = useContext(ShopContext) as ShopContextType | null;

  if (!context) {
    throw new Error("ShopContext must be used within a ShopContextProvider");
  }

  const { addToCart, removeFromCart, cartItems } = context;

  // Get item quantity in cart
  const cartItemAmount: number = cartItems[_id] || 0;

  return (
    <div className="cartItem">
      <img src={productImage} alt={productName} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p>Rs {price}</p>

        <div className="countHandler">
          <button onClick={() => removeFromCart(_id)}>-</button>
          <span>{cartItemAmount}</span>
          <button onClick={() => addToCart(_id)}>+</button>
        </div>
      </div>
    </div>
  );
};
