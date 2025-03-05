//Import React Router components for navigation
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Import the Navbar component
import { Navbar } from "./components/navbar";
// Import FC(Function Component) type from React for TypeScript support
import { FC } from "react";

//import the Shop, Cart and Checkout components
import { Shop } from "./pages/shop/shop";
import { Cart } from "./pages/cart/cart";

//Import ShopContextProvider to manage global state
import { ShopContextProvider } from "./context/shop-context";

//Import the Checkout component
import { Checkout } from "./pages/checkout/checkout";

const App: FC = () => {
  return (
    <div className="App">
      {/* Main container div with a className "App" */}
      <ShopContextProvider>
        {/* Wrap the entire app with ShopContextProvider to provide global state */}
        <Router>
          {/* BrowserRouter to enable routing/navigation */}
          <Navbar />
          {/* Include the Navbar component for navigation */}
          <Routes>
            {/* Define the routes for the application */}
            <Route path="/" element={<Shop />} />
            {/* Route for the Shop page (Home) */}
            <Route path="/cart" element={<Cart />} />
            {/* Route for the Cart page */}
            <Route path="/checkout" element={<Checkout />} />
            {/* Route for the Checkout page */}
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
};

export default App; // Export the App component as the default export
