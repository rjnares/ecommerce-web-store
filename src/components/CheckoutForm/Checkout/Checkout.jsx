import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import useStyles from "./styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";

import { commerce } from "../../../lib/commerce";

const steps = ["Shipping address", "Payment details"];

const Checkout = ({ cart }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [checkoutToken, setCheckoutToken] = React.useState(null);

  const classes = useStyles();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckoutToken(token);
      } catch (error) {}
    };

    generateToken();
  }, [cart]);

  const Confirmation = () => <div>Confirmation</div>;

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} />
    ) : (
      <PaymentForm />
    );

  return (
    <React.Fragment>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => {
              return (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default Checkout;
