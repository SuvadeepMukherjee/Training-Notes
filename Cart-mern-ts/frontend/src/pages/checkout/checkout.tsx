import React, { useEffect, useState } from "react";
import axios from "axios";

// Define Product type
interface Product {
  _id: string;
  productName: string;
  price: number;
  productImage: string;
}

// Define Cart Item type
interface CartItem {
  product: Product;
  quantity: number;
}

// Define Cart Data type
interface CartData {
  userId: string;
  cartItems: CartItem[];
}

// Checkout component
export const Checkout: React.FC = () => {
  // State to store cart data
  const [cartData, setCartData] = useState<CartData | null>(null);
  // State to store total cart amount
  const [totalAmount, setTotalAmount] = useState<number>(0);

  // Hardcoded userId (replace with dynamic user authentication in real-world apps)
  const userId: string = "65c96f8a1a2b4c001f3d8e9a";

  // Fetch cart data when component mounts or userId changes
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get<CartData>(
          `http://localhost:5000/api/products/products-in-cart?userId=${userId}`
        );
        setCartData(response.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, [userId]);

  // Fetch total cart amount when component mounts or userId changes
  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const response = await axios.get<{ totalAmount: number }>(
          `http://localhost:5000/api/cart/totalAmount?userId=${userId}`
        );
        setTotalAmount(response.data.totalAmount || 0);
      } catch (error) {
        console.error("Error fetching total amount:", error);
      }
    };

    fetchTotalAmount();
  }, [userId]);

  return (
    <div>
      <h1>Checkout Page</h1>
      {/* Conditional rendering: Display cart details if available, else show a loading message */}
      {cartData ? (
        <div>
          <h2>Cart for User: {cartData.userId}</h2>
          {cartData.cartItems.map((item, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <img
                src={item.product.productImage}
                alt={item.product.productName}
                width="150"
              />
              <h3>{item.product.productName}</h3>
              <p>Price: Rs {item.product.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
          <h2>Total Amount: Rs {totalAmount}</h2>
        </div>
      ) : (
        <p>Loading cart items...</p>
      )}
    </div>
  );
};

export default Checkout;
