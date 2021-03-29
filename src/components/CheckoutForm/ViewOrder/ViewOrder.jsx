import React from "react";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import { Link } from "react-router-dom";

import useStyles from "./styles";

const ViewOrder = () => {
  const orderReceipt = JSON.parse(sessionStorage.getItem("order_receipt"));
  const classes = useStyles();

  return orderReceipt ? (
    <React.Fragment>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <div className={classes.content}>
          <div className={classes.header}>
            <Typography variant="h4" align="center" gutterBottom>
              Thank you for your purchase,{" "}
            </Typography>
            <Typography variant="h4" gutterBottom align="center">
              {orderReceipt.customer.firstname} {orderReceipt.customer.lastname}
            </Typography>
            <Typography variant="h5" align="center">
              Your latest order:
            </Typography>
            <Typography variant="h5" align="center">
              {orderReceipt.customer_reference}
            </Typography>
          </div>
          <Divider className={classes.divider} />
          <List disablePadding>
            {orderReceipt.order.line_items.map((item) => (
              <ListItem styles={{ padding: "10px 0" }} key={item.name}>
                <ListItemText
                  primary={item.name}
                  secondary={`Quantity: ${item.quantity}`}
                />
                <Typography variant="body2">
                  {item.price.formatted_with_symbol}
                </Typography>
              </ListItem>
            ))}
            <Divider className={classes.divider} />
            <ListItem styles={{ padding: "10px 0" }}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                {orderReceipt.order.subtotal.formatted_with_symbol}
              </Typography>
            </ListItem>
          </List>
        </div>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          type="button"
        >
          Back to Home
        </Button>
        <div className={classes.footer} />
      </main>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <div className={classes.toolbar} />
      <main className={classes.content}>
        <div className={classes.layout}>
          <div className={classes.header}>
            <Typography variant="h4" align="center" gutterBottom>
              Oops!
            </Typography>
            <ErrorOutlineIcon color="secondary" style={{ fontSize: 50 }} />
            <div style={{ height: 20 }} />
            <Typography variant="h4" align="center">
              Error: no order info
            </Typography>
          </div>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            type="button"
          >
            Back to Home
          </Button>
        </div>
      </main>
    </React.Fragment>
  );
};

export default ViewOrder;
