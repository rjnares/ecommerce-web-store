import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";

const Cart = ({
  cart,
  handleUpdateCartItemQty,
  handleRemoveCartItem,
  handleEmptyCart, setCheckoutError, setOrder
}) => {
  const classes = useStyles();

  const EmptyCart = () => (
    <Typography variant="h5" align="center">
      Your shopping cart is empty,{" "}
      <Link to="/" className={classes.link}>
        go buy stuff!
      </Link>
    </Typography>
  );

  const FilledCart = () => (
    <React.Fragment>
      <Grid container justify="center" spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem
              item={item}
              onUpdateCartItemQty={handleUpdateCartItemQty}
              onRemoveCartItem={handleRemoveCartItem}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cartDetails}>
        <Typography variant="h4">
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            type="button"
            size="large"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Empty Cart
          </Button>
          <Button
            component={Link}
            to="/checkout"
            className={classes.checkoutButton}
            type="button"
            size="large"
            variant="contained"
            color="primary" onClick={() => {
              setCheckoutError(null);
              setOrder(null);
            }}
          >
            Checkout
          </Button>
        </div>
      </div>
      <div style={{height:50}}/>
    </React.Fragment>
  );

  if (!cart.line_items) return "Loading...";

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h2" gutterBottom align="center">
        Shopping Cart
      </Typography>
      <div style={{height: 30}}/>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};
export default Cart;
