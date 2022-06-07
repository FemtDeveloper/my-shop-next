import { Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import { CartContext } from "../../context/cart";
import { currency } from "../../utils";

export const OrderSummary = () => {
  const { numberOfItems, subTotal, tax, total } = useContext(CartContext);

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography> No. de productos</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography sx={{ fontWeight: "600" }}>
          {" "}
          {numberOfItems} {numberOfItems > 1 ? "Productos" : "Producto"}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography sx={{ fontWeight: "600" }}> Sub-total</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(subTotal)} </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography sx={{ fontWeight: "600" }}>
          {" "}
          Iva ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)
        </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography> {currency.format(tax)} </Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
          Total:{" "}
        </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 2 }}>
        <Typography variant="subtitle1">{currency.format(total)} </Typography>
      </Grid>
    </Grid>
  );
};
