import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Checkout, LoadingState } from "./components";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    await commerce.products
      .list()
      .then((products) => {
        setProducts(products.data);
      })
      .catch((error) => {
        console.log("There was an error fetching the products", error);
      })
      .finally(() => setLoading(false));
  };

  const fetchCart = async () => {
    try {
      const data = await commerce.cart.retrieve();
      setCart(data);
    } catch (error) {
      console.log(`[App::fetchCart] ${error}`);
    }
  };

  const handleAddToCart = async (productId, quantity) => {
    try {
      const { cart } = await commerce.cart.add(productId, quantity);
      setCart(cart);
    } catch (error) {
      console.log(`[App::handleAddToCart] ${error}`);
    }
  };

  const handleUpdateCartItemQty = async (productId, quantity) => {
    try {
      const { cart } = await commerce.cart.update(productId, { quantity });
      setCart(cart);
    } catch (error) {
      console.log(`[App::handleUpdateCartItemQty] ${error}`);
    }
  };

  const handleRemoveCartItem = async (productId) => {
    try {
      const { cart } = await commerce.cart.remove(productId);
      setCart(cart);
    } catch (error) {
      console.log(`[App::handleRemoveCartItem] ${error}`);
    }
  };

  const handleEmptyCart = async () => {
    try {
      const { cart } = await commerce.cart.empty();
      setCart(cart);
    } catch (error) {
      console.log(`[App::handleEmptyCart] ${error}`);
    }
  };

  const refreshCart = async () => {
    try {
      const newCart = await commerce.cart.refresh();
      setCart(newCart);
    } catch (error) {
      console.log(`[App::refreshCart] ${error}`);
    }
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            {loading ? (
              <LoadingState msg={"Fetching Products"} />
            ) : (
              <Products products={products} onAddToCart={handleAddToCart} />
            )}
          </Route>
          <Route exact path="/cart">
            <Cart
              cart={cart}
              handleUpdateCartItemQty={handleUpdateCartItemQty}
              handleRemoveCartItem={handleRemoveCartItem}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
