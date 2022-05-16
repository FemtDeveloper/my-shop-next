import { Grid, Typography } from "@mui/material";
import React from "react";

export const OrderSummary = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography> No. de productos</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography> 3 items</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography> Sub-total</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{`$${175.92}`} </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography> Iva (19%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography> {`$${40.93}`} </Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total: </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 2 }}>
        <Typography variant="subtitle1">{`$${210.93}`} </Typography>
      </Grid>
    </Grid>
  );
};
