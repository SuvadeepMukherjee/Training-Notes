// import React from "react";

// const App: React.FC = () => {
//   return <div>Hello World From TypeScript</div>;
// };

// export default App;

import React from "react";
//import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
//import { Shop } from "./pages/shop/shop";
//import { Cart } from "./pages/cart/cart";
//import { ShopContextProvider } from "./context/shop-context";
//import { Checkout } from "./pages/checkout";

const App: React.FC = () => {
  return (
    <div className="App">
      {/* Main container for the application */}
      {/* <ShopContextProvider> */}
      {/* Provides global state for shopping-related data */}
      <Router>
        {/* Enables client-side routing */}
        <Navbar />
        {/* Displays the navigation bar */}
        <Routes>
          {/* Defines route paths for different pages */}
          {/* <Route path="/" element={<Shop />} /> */}
          {/* Route for the Shop page (home) */}
          {/* <Route path="/cart" element={<Cart />} /> */}
          {/* Route for the Cart page */}
          {/* <Route path="/checkout" element={<Checkout />} /> */}
        </Routes>
      </Router>
      {/* </ShopContextProvider> */}
    </div>
  );
};

export default App;
