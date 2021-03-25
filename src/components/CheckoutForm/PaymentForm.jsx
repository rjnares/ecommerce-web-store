import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Review from "./Review";

const PaymentForm = ({ shippingData, checkoutToken }) => {
  return (
    <React.Fragment>
      <Review checkoutToken={checkoutToken} />
    </React.Fragment>
  );
};

export default PaymentForm;
