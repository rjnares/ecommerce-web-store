import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link, useLocation } from "react-router-dom";

import logo from "../../assets/tech-logo.png";
import useStyles from "./styles";

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h4"
            className={classes.title}
          >
            <img src={logo} alt="Tech Cycle" className={classes.image} />
            TechCycle
          </Typography>
          <div className={classes.grow}></div>

          {location.pathname === "/" && (
            <div>
              <IconButton
                component={Link}
                to="/cart"
                aria-label="Shopping Cart"
              >
                <Badge badgeContent={totalItems} color="primary">
                  <ShoppingCartIcon style={{ fontSize: 30 }} />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
