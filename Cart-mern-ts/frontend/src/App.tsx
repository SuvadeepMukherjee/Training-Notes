import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { FC } from "react";
import { Shop } from "./pages/shop/shop";
import { Cart } from "./pages/cart/cart";
import { ShopContextProvider } from "./context/shop-context";
import { Checkout } from "./pages/checkout/checkout";

const App: FC = () => {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
};

export default App;

// import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Navbar } from "./components/navbar";
// import { Shop } from "./pages/shop/shop";
// import { Cart } from "./pages/cart/cart";
// import { ShopContextProvider } from "./context/shop-context";
// import { Checkout } from "./pages/checkout";
// import { FC } from "react";

// const App: FC = () => {
//   return (
//     <div className="App">
//       <ShopContextProvider>
//         <Router>
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<Shop />} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/checkout" element={<Checkout />} />
//           </Routes>
//         </Router>
//       </ShopContextProvider>
//     </div>
//   );
// };

// export default App;
