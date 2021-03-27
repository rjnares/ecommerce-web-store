import React from 'react'

import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"

import {Link} from "react-router-dom"

import useStyles from "./styles"

const ViewOrder = () => {
    const orderReceipt = JSON.parse(sessionStorage.getItem("order_receipt"));
    const classes = useStyles();
    return (
      <React.Fragment>
        <div>
          <Typography variant="h5">
            Thank you for your purchase, {orderReceipt.customer.firstname}{" "}
            {orderReceipt.customer.lastname}!
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">
            Order ref: {orderReceipt.customer_reference}
          </Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to Home
        </Button>
      </React.Fragment>
    )
}

export default ViewOrder
