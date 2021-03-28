import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

import useStyles from "./styles";

const CartItem = ({ item, onUpdateCartItemQty, onRemoveCartItem }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        image={item.media.source}
        alt={item.name}
        className={classes.media}
      ></CardMedia>
      <CardContent className={classes.cardContent}>
        <Typography variant="h5">{item.name}</Typography>
        <Typography variant="h6" color="primary">
          {item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <IconButton
            aria-label="remove"
            onClick={() => onUpdateCartItemQty(item.id, item.quantity - 1)}
            color="secondary"
          >
            <RemoveIcon />
          </IconButton>
          <Typography variant="h6">{item.quantity}</Typography>
          <IconButton
            aria-label="add"
            onClick={() => onUpdateCartItemQty(item.id, item.quantity + 1)}
            color="secondary"
          >
            <AddIcon />
          </IconButton>
        </div>
        <IconButton
          aria-label="Remove"
          onClick={() => onRemoveCartItem(item.id)}
        >
          <RemoveShoppingCartIcon style={{ fontSize: 30 }} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CartItem;
