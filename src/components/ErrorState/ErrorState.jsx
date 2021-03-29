import React from "react";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Button from "@material-ui/core/Button";
import { Link, useLocation } from "react-router-dom";

import useStyles from "./styles";

const ErrorState = ({ msg }) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <React.Fragment>
      <CssBaseline />
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
              Error: {msg}
            </Typography>
          </div>
          {location.pathname !== "/" && (
            <Button
              component={Link}
              to="/"
              variant="contained"
              color="primary"
              type="button"
            >
              Back to Home
            </Button>
          )}
        </div>
      </main>
    </React.Fragment>
  );
};

export default ErrorState;
