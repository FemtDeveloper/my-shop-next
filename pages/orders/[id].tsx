import NextLink from "next/link";
import { GetServerSideProps, NextPage } from "next";
import { PayPalButtons } from "@paypal/react-paypal-js";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";
import { getSession } from "next-auth/react";
import { dbOrders } from "../../database";
import { IOrder } from "../../interfaces";
import { tesloApi } from "../../api";
import { useRouter } from "next/router";

interface Props {
  order: IOrder;
}
interface OrderResponseBody {
  id: string;
  status:
    | "COMPLETED"
    | "SAVED"
    | "APPROVED"
    | "VOIDED"
    | "PAYER_ACTION_REQUIRED";
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const router = useRouter();
  const [isPaying, setIsPaying] = useState(false);

  const { shippingAddress } = order;

  const onOrderCompleted = async (details: OrderResponseBody) => {
    if (details.status !== "COMPLETED") {
      return alert("No se ha completado el pago en Paypal");
    }
    setIsPaying(true);
    try {
      const { data } = await tesloApi.post(`/orders/pay`, {
        transactionId: details.id,
        orderId: order._id,
      });
      router.reload();
    } catch (error) {
      console.log(error);
      setIsPaying(false);
      alert("Error: " + error);
    }
  };

  return (
    <ShopLayout
      title="Resumen de la Orden"
      pageDescription="Resumen de la Compra"
    >
      <Typography variant="h1" component="h1">
        Orden: {order._id}
      </Typography>

      {order.isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label="Orden ya fue pagada"
          variant="outlined"
          color="primary"
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label="Pendiente de pago"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
        />
      )}

      <Grid container mt={3} className="fadeIn">
        <Grid item xs={12} sm={7}>
          <CartList products={order.orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Resumen (<b> {order.numberOfItems}</b>
                {order.numberOfItems > 1 ? " Productos" : " Producto"} )
              </Typography>
              <Divider sx={{ marginY: 2 }} />
              <Box display="flex" justifyContent="end">
                <NextLink href="/checkout/address" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>
              <Typography variant="subtitle1">Dirección de Entrega</Typography>
              <Typography>
                {shippingAddress.firstName} {shippingAddress.lastName}{" "}
              </Typography>
              <Typography>
                {shippingAddress.address}
                {shippingAddress.address2
                  ? `, ${shippingAddress.address2}`
                  : ""}
              </Typography>
              <Typography>Código Postal: {shippingAddress.zip} </Typography>
              <Typography>
                {shippingAddress.city}, {shippingAddress.country}
              </Typography>
              <Typography>{shippingAddress.phone}</Typography>
              <Divider sx={{ marginY: 2 }} />

              <OrderSummary
                orderValues={{
                  numberOfItems: order.numberOfItems,
                  tax: order.tax,
                  subTotal: order.subTotal,
                  total: order.total,
                }}
              />
              <Box sx={{ mt: 2 }} display="flex" flexDirection="column">
                <Box
                  display="flex"
                  justifyContent="center"
                  sx={{ display: isPaying ? "flex" : "none" }}
                >
                  <CircularProgress />
                </Box>

                <Box
                  sx={{ display: isPaying ? "none" : "flex" }}
                  flexDirection="column"
                >
                  {order.isPaid ? (
                    <Chip
                      sx={{ marginY: 2 }}
                      label="Pagada"
                      color="secondary"
                      icon={<CreditCardOffOutlined />}
                    />
                  ) : (
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: `${Math.round(order.total * 100) / 100}`,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order!.capture().then((details) => {
                          onOrderCompleted(details);

                          console.log({ details });
                        });
                      }}
                    />
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};
export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = "" } = query;
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    };
  }

  const order = await dbOrders.getOrderById(id.toString());
  if (!order) {
    return {
      redirect: {
        destination: "/orders/history",
        permanent: false,
      },
    };
  }
  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: "/orders/history",
        permanent: false,
      },
    };
  }

  return {
    props: { order },
  };
};

export default OrderPage;
