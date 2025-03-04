import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

// Define the expected shape of the product data
interface ProductData {
  _id: string;
  productName: string;
  price: number;
  productImage: string;
}

// Define props type for Product component
interface ProductProps {
  data: ProductData;
}

// Define the ShopContext type (update this based on actual implementation)
interface ShopContextType {
  cartItems: { [key: string]: number };
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
}

// Product component
export const Product: React.FC<ProductProps> = ({ data }) => {
  const { _id, productName, price, productImage } = data;

  const context = useContext(ShopContext) as ShopContextType | null;

  if (!context) {
    throw new Error("ShopContext must be used within a ShopContextProvider");
  }

  const { addToCart, removeFromCart, cartItems } = context;

  const cartItemAmount: number = cartItems[_id] || 0;

  return (
    <div className="product">
      <img src={productImage} alt={productName} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p>Rs {price}</p>
      </div>
      <button className="addToCartBttn" onClick={() => addToCart(_id)}>
        Add To Cart {cartItemAmount > 0 && <>({cartItemAmount})</>}
      </button>
      <div className="countHandler">
        <button onClick={() => removeFromCart(_id)}>-</button>
        <button onClick={() => addToCart(_id)}>+</button>
      </div>
    </div>
  );
};
