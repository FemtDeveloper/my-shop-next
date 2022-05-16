import NextLink from "next/link";
import { Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import React from "react";
import { ShopLayout } from "../../components/layouts";

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
        <Chip label="Pagada" color="success" variant="outlined" />
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
        <NextLink href={`/orders/${params.row.id}`} passHref>
          <Link underline="always">Ver Orden</Link>
        </NextLink>
      );
    },
  },
];
const rows = [
  { id: 1, paid: true, fullName: "Felix Miranda" },
  { id: 2, paid: false, fullName: "Felix Miranda" },
  { id: 3, paid: true, fullName: "Felix Miranda" },
  { id: 4, paid: false, fullName: "Felix Miranda" },
  { id: 5, paid: true, fullName: "Felix Miranda" },
];

const HystoryPage = () => {
  return (
    <ShopLayout
      title={"Historial de pedidos"}
      pageDescription={"Historial de ppedidos del cliente"}
    >
      <Typography variant="h1" component="h1">
        Historial de pedidos del cliente
      </Typography>
      <Grid container>
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

export default HystoryPage;
