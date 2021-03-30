import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

import useStyles from "./styles";

const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.media.source}
        title={product.name}
      ></CardMedia>
      <div className={classes.cardBottom}>
        <CardContent>
          <div className={classes.cardContent}>
            <Typography variant="h5" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h6" color="primary">
              {product.price.formatted_with_symbol}
            </Typography>
          </div>
          <Typography
            dangerouslySetInnerHTML={{ __html: product.description }}
            variant="body1"
            color="secondary"
            align="center"
          ></Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
          <IconButton
            aria-label="Add to Cart"
            onClick={() => onAddToCart(product.id, 1)}
          >
            <AddShoppingCartIcon style={{ fontSize: 30 }} />
          </IconButton>
        </CardActions>
      </div>
    </Card>
  );
};

export default Product;
