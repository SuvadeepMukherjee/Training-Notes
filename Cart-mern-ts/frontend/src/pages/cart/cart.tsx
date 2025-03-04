import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";
import "./cart.css";
import { useNavigate } from "react-router-dom";

// Define product data type
interface Product {
  _id: string;
  productName: string;
  price: number;
  productImage: string;
}

// Define ShopContext type
interface ShopContextType {
  cartItems: { [key: string]: number };
  getTotalCartAmount: () => Promise<number>;
}

// Cart component
export const Cart: React.FC = () => {
  const context = useContext(ShopContext) as ShopContextType | null;

  if (!context) {
    throw new Error("ShopContext must be used within a ShopContextProvider");
  }

  const { cartItems, getTotalCartAmount } = context;

  // State to store fetched products
  const [products, setProducts] = useState<Product[]>([]);
  // State to store total cart amount
  const [totalAmount, setTotalAmount] = useState<number>(0);

  // Hook to navigate between routes
  const navigate = useNavigate();

  //Fetch total cart amount when getTotalCartAmount changes
  useEffect(() => {
    const fetchTotalAmount = async () => {
      const amount = await getTotalCartAmount();
      setTotalAmount(amount);
    };
    fetchTotalAmount();
  }, [getTotalCartAmount]);

  // Fetch all products from the server when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(
          "http://localhost:5000/api/products"
        );
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cartItems">
        {products
          .filter((product) => cartItems[product._id] > 0)
          .map((product) => (
            <CartItem key={product._id} data={product} />
          ))}
      </div>
      {totalAmount > 0 ? (
        <div className="checkout">
          <p>Subtotal: Rs {totalAmount}</p>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
          <button onClick={() => navigate("/checkout")}>Checkout</button>
        </div>
      ) : (
        <h1>Your Cart is Empty</h1>
      )}
    </div>
  );
};
