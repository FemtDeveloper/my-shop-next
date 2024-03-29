import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";
import { CartContext } from "../../context";

const CartPage = () => {
  const { isLoaded, cart, numberOfItems } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace("/cart/empty");
    }
  }, [isLoaded, cart, router]);

  if (!isLoaded || cart.length === 0) {
    return <></>;
  }

  return (
    <ShopLayout
      title={`Carrito de compras ${numberOfItems}`}
      pageDescription="Carrito de compras de la tienda"
    >
      <Typography variant="h1" component="h1" sx={{ color: "darkcyan" }} mb={3}>
        Carrito de compras
      </Typography>

      <Grid container mt={3}>
        <Grid item xs={12} sm={7}>
          <CartList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2" sx={{ color: "darkcyan" }}>
                Order
              </Typography>
              <Divider sx={{ marginY: 2 }} />
              <OrderSummary />
              <Box sx={{ mt: 2 }}>
                <Button
                  className="circular-btn"
                  fullWidth
                  href="/checkout/address"
                  sx={{ backgroundColor: "darkcyan" }}
                >
                  Checkout
                </Button>{" "}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;
