import NextLink from "next/link";
import { GetServerSideProps, NextPage } from "next";

import { Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import React from "react";
import { ShopLayout } from "../../components/layouts";
import { getSession } from "next-auth/react";
import { dbOrders } from "../../database";
import { IOrder } from "../../interfaces";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullName", headerName: "Nombre Completo", width: 300 },
  {
    field: "paid",
    headerName: "Pagada",
    width: 200,
    description: "Casilla muestra si la orden está pagada",
    renderCell: (params: GridValueGetterParams) => {
      return params.row.paid ? (
        <Chip label="Pagada" color="primary" variant="outlined" />
      ) : (
        <Chip label="No Pagada" color="error" variant="outlined" />
      );
    },
  },
  {
    field: "LinkToOrder",
    headerName: "Ver Orden",
    width: 200,
    description: "Link te dirige a la orden",

    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${params.row.orderId}`} passHref>
          <Link underline="always">Ver Orden</Link>
        </NextLink>
      );
    },
  },
];

interface Props {
  orders: IOrder[];
}

const HystoryPage: NextPage<Props> = ({ orders }) => {
  const rows = orders.map((order, i) => ({
    id: i + 1,
    paid: order.isPaid,
    fullName: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
    orderId: order._id,
  }));

  return (
    <ShopLayout
      title={"Historial de pedidos"}
      pageDescription={"Historial de ppedidos del cliente"}
    >
      <Typography variant="h1" component="h1">
        Historial de pedidos del cliente
      </Typography>
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            columns={columns}
            rows={rows}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/history`,
        permanent: false,
      },
    };
  }

  const orders = await dbOrders.getOrdersByUser(session.user._id);

  return {
    props: { orders },
  };
};

export default HystoryPage;
