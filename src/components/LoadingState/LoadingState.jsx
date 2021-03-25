import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";

import useStyles from "./styles";

const LoadingState = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Typography variant="h2" gutterBottom>
        Loading...
      </Typography>
      <CircularProgress size="4rem" className={classes.progress} />
    </div>
  );
};

export default LoadingState;
