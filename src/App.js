import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { commerce } from "./lib/commerce";
import {
  Products,
  Navbar,
  Cart,
  Checkout,
  LoadingState,
  ErrorState,
  ViewOrder,
} from "./components";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState(null);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  const fetchTimeout = async (fetch) => {
    // Used to show loading state while products are fetched
    setTimeout(fetch, 1000);
  };

  const fetchProducts = async () => {
    await commerce.products
      .list()
      .then((products) => {
        setProducts(products.data);
        setProductsError(false);
      })
      .catch((error) => {
        console.log("There was an error fetching the products", error);
        setProductsError(true);
      })
      .finally(() => setProductsLoading(false));
  };

  const fetchCart = async () => {
    await commerce.cart
      .retrieve()
      .then((cart) => {
        setCart(cart);
      })
      .catch((error) => {
        console.error("There was an error fetching the cart", error);
      });
  };

  const handleAddToCart = async (productId, quantity) => {
    await commerce.cart
      .add(productId, quantity)
      .then((item) => {
        setCart(item.cart);
      })
      .catch((error) => {
        console.error("There was an error adding the item to the cart", error);
      });
  };

  const handleUpdateCartItemQty = async (lineItemId, quantity) => {
    await commerce.cart
      .update(lineItemId, { quantity })
      .then((resp) => {
        setCart(resp.cart);
      })
      .catch((error) => {
        console.log("There was an error updating the cart items", error);
      });
  };

  const handleRemoveCartItem = async (lineItemId) => {
    await commerce.cart
      .remove(lineItemId)
      .then((resp) => {
        setCart(resp.cart);
      })
      .catch((error) => {
        console.error(
          "There was an error removing the item from the cart",
          error
        );
      });
  };

  const handleEmptyCart = async () => {
    await commerce.cart
      .empty()
      .then((resp) => {
        setCart(resp.cart);
      })
      .catch((error) => {
        console.error("There was an error emptying the cart", error);
      });
  };

  const refreshCart = () => {
    commerce.cart
      .refresh()
      .then((newCart) => {
        setCart(newCart);
      })
      .catch((error) => {
        console.log("There was an error refreshing your cart", error);
      });
  };

  const handleCaptureCheckout = (checkoutTokenId, newOrder) => {
    commerce.checkout
      .capture(checkoutTokenId, newOrder)
      .then((order) => {
        // Save the order into state
        setOrder(order);

        // Clear the cart
        refreshCart();

        // // Send the user to the receipt
        // this.props.history.push('/confirmation');

        // Store the order in session storage so we can show it again if the
        // user refreshes the page!
        sessionStorage.setItem("order_receipt", JSON.stringify(order));
      })
      .catch((error) => {
        console.log("There was an error confirming your order", error);
        setCheckoutError(error.data.error);
      });
  };

  useEffect(() => {
    // fetchProducts();
    fetchTimeout(fetchProducts);
    fetchCart();
  }, []);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            {productsLoading ? (
              <LoadingState msg={"Fetching Products"} />
            ) : productsError ? (
              <ErrorState msg={"failed to fetch products"} />
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
              setCheckoutError={setCheckoutError}
              setOrder={setOrder}
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              checkoutError={checkoutError}
            />
          </Route>
          <Route exact path="/view-order">
            <ViewOrder />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
