import React from "react";
import Grid from "@material-ui/core/Grid";

import Product from "./Product/Product";

const products = [
  {
    id: 1,
    name: "Shoes",
    description: "Running shoes",
    price: "$5",
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/qwqfyddzikcgc4ozwigp/revolution-5-mens-running-shoe-TzTL9k.jpg",
  },
  {
    id: 2,
    name: "MacBook",
    description: "Apple MacBook",
    price: "$10",
    image:
      "https://static.bhphoto.com/images/images500x500/1562676502_1492876.jpg",
  },
];
const Products = () => {
  return (
    <main>
      <Grid container justify="center" spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
