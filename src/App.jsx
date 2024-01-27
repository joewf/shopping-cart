import React from 'react';
import NavigationBar from './Navigation';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Products from './Products';
import ProductDetails from './ProductDetails';
import ShoppingCart from './Cart';

function App() {
  return (
    <>
      {/* <NavigationBar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<ShoppingCart />} />
      </Routes>
    </>
  );
}

export default App;