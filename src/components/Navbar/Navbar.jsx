import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import logo from "../../assets/tech-logo.png";
import useStyles from "./styles";

const Navbar = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title} color="inherit">
            <img
              src={logo}
              alt="CommerceJS"
              height="30px"
              className={classes.image}
            />
            Rob's Tech
          </Typography>
          <div className={classes.grow}></div>
          <div className={classes.button}>
            <IconButton aria-label="Shopping Cart" color="inherit">
              <Badge badgeContent={2} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
