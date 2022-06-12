import { Grid, Typography } from "@mui/material";
import React, { FC, useContext } from "react";
import { CartContext } from "../../context/cart";
import { currency } from "../../utils";

interface Props {
  orderValues?: {
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
  };
}

export const OrderSummary: FC<Props> = ({ orderValues }) => {
  const { numberOfItems, subTotal, tax, total } = useContext(CartContext);

  const summaryValues = orderValues
    ? orderValues
    : { numberOfItems, subTotal, tax, total };

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography> No. de productos</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography sx={{ fontWeight: "600" }}>
          {" "}
          {summaryValues.numberOfItems}{" "}
          {summaryValues.numberOfItems > 1 ? "Productos" : "Producto"}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography sx={{ fontWeight: "600" }}> Sub-total</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(summaryValues.subTotal)} </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography sx={{ fontWeight: "600" }}>
          {" "}
          Iva ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)
        </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography> {currency.format(summaryValues.tax)} </Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
          Total:{" "}
        </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 2 }}>
        <Typography variant="subtitle1">
          {currency.format(summaryValues.total)}{" "}
        </Typography>
      </Grid>
    </Grid>
  );
};
