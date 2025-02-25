import React, { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "./product";
import "./shop.css";

// Define the product type
interface ProductType {
  _id: string;
  productName: string;
  price: number;
  productImage: string;
  category: string;
}

export const Shop: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]); // Stores fetched products
  const [category, setCategory] = useState<string>("all"); // Stores selected category

  // Function to fetch products based on category
  const fetchProducts = async (selectedCategory: string) => {
    try {
      // If category is 'all', fetch all products, otherwise filter by category
      const url =
        selectedCategory === "all"
          ? "http://localhost:5000/api/products"
          : `http://localhost:5000/api/products?category=${selectedCategory}`;

      const response = await axios.get<ProductType[]>(url);
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // useEffect to fetch products when category changes
  useEffect(() => {
    fetchProducts(category);
  }, [category]);

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>Shop</h1>
      </div>

      {/* Category Filter Dropdown */}
      <div className="category-filter">
        <label>Filter by Category: </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All</option>
          <option value="laptop">Laptop</option>
          <option value="mobile">Mobile</option>
          <option value="tshirts">T-Shirts</option>
          <option value="camera">Camera</option>
        </select>
      </div>

      <div className="products">
        {products.map((product) => (
          <Product key={product._id} data={product} />
        ))}
      </div>
    </div>
  );
};
