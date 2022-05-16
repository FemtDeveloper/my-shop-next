import NextLink from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React from "react";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";
import { CreditCardOffOutlined } from "@mui/icons-material";

const OrderPage = () => {
  return (
    <ShopLayout
      title="Resumen de la Orden"
      pageDescription="Resumen de la Compra"
    >
      <Typography variant="h1" component="h1">
        Orden: ABC!123
      </Typography>
      {/* <Chip
        sx={{ marginY: 2 }}
        label="Pendiente de pago"
        color="error"
        icon={<CreditCardOffOutlined />}
      /> */}
      <Chip
        sx={{ marginY: 2 }}
        label="Pagada"
        color="success"
        icon={<CreditCardOffOutlined />}
      />
      <Grid container mt={3}>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resumen (3 productos)</Typography>
              <Divider sx={{ marginY: 2 }} />
              <Box display="flex" justifyContent="end">
                <NextLink href="/checkout/address" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>
              <Typography variant="subtitle1">Dirección de Entrega</Typography>
              <Typography>Felix Miranda</Typography>
              <Typography>Calle 12 #54-23</Typography>
              <Typography>Código Postal: 110631</Typography>
              <Typography>Bogotá, Colombia</Typography>
              <Typography>(+58) 32423-4534</Typography>
              <Divider sx={{ marginY: 2 }} />
              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>
              <OrderSummary />
              <Box sx={{ mt: 2 }}>
                <h1>Pagar</h1>
                <Chip
                  sx={{ marginY: 2 }}
                  label="Pagada"
                  color="success"
                  icon={<CreditCardOffOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
