import React from "react";
import { GetServerSideProps } from "next";

import NextLink from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";
import { jwt } from "../../utils";

const SummaryPage = () => {
  return (
    <ShopLayout
      title="Resumen de la Compra"
      pageDescription="Resumen de la Compra"
    >
      <Typography variant="h1" component="h1">
        Resumen de la compra
      </Typography>
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
                <Button color="secondary" className="circular-btn" fullWidth>
                  Confirmar orden
                </Button>{" "}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token = "" } = req.cookies;
  let userId = "";
  let isValidToken = false;
  try {
    userId = await jwt.isValidToken(token);
    isValidToken = true;
  } catch (error) {
    isValidToken = false;
  }
  if (!isValidToken) {
    return {
      redirect: {
        destination: "/auth/login?p=/checkout/summary",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default SummaryPage;
