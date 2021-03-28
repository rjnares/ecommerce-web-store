import React, { useState, useEffect, useLayoutEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link, useHistory } from "react-router-dom";

import useStyles from "./styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";

import { commerce } from "../../../lib/commerce";

const steps = ["Shipping address", "Payment details"];

const Checkout = ({ cart, onCaptureCheckout, checkoutErrorMsg }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orderError, setOrderError] = useState("");

  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    sessionStorage.removeItem("order_error");
  }, []);

  useEffect(() => {
    setOrderError(JSON.parse(sessionStorage.getItem("order_error")));
  }, [checkoutErrorMsg]);

  let Confirmation = () =>
    orderError ? (
      <React.Fragment>
        <Typography  align="center" variant="h5">Error: {checkoutErrorMsg}</Typography>
        <br />
        <Button component={Link} to="/" variant="contained" type="button" color="secondary">
          Back to Home
        </Button>
      </React.Fragment>
    ) : (
      <div className={classes.confirmationSuccess}>
        <Typography variant="h5" gutterBottom>
          Thank you for your order!
        </Typography>
        <div className={classes.icon}>
          <CheckCircleIcon style={{fontSize:50}}/>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <Button component={Link} to="/" variant="contained" type="button" color="secondary" >
            Back to Home
          </Button>
          <Button
            component={Link}
            to="/view-order"
            variant="contained"
            type="button"
            color="primary"
          >
            View Order
          </Button>
        </div>
      </div>
    );

  useLayoutEffect(() => {
    if (!cart.line_items && activeStep === 0) history.push("/cart");
  }, [cart, activeStep, history]);

  useEffect(() => {
    const generateCheckoutToken = () => {
      if (cart && cart.line_items && cart.line_items.length) {
        commerce.checkout
          .generateToken(cart.id, { type: "cart" })
          .then((token) => {
            setCheckoutToken(token);
          })
          .catch((error) => {
            console.log("There was an error in generating a token", error);
          })
          .finally(() => setLoading(false));
      }
    };

    generateCheckoutToken();
  }, [cart]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  const timeout = () => {
    setTimeout(() => {
      setIsFinished(true);
    }, 3000);
  };

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
        nextStep={nextStep}
        timeout={timeout}
      />
    );

  return (
    <React.Fragment>
      <CssBaseline />
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
            isFinished ? (
              <Confirmation />
            ) : (
              <div className={classes.spinner}>
                <CircularProgress />
              </div>
            )
          ) : loading ? (
            <div className={classes.spinner}>
              <CircularProgress />
            </div>
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default Checkout;
