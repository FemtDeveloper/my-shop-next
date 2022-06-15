import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  GroupsOutlined,
  ProductionQuantityLimitsOutlined,
} from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { SummaryTile } from "../../components/admin/";
import { AdminLayout } from "../../components/layouts";
import { DashboardSummaryResponse } from "../../interfaces";

const DashboardPage = () => {
  const { data, error } = useSWR<DashboardSummaryResponse>(
    "/api/admin/dashboard",
    { refreshInterval: 30000 }
  );

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!data && !error) {
    return <> </>;
  }

  if (error) {
    console.log(error);
    return <Typography>Error al cargar la información</Typography>;
  }

  const {
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  } = data!;

  return (
    <AdminLayout
      title={"Dashboard"}
      subTitle={"Estadísticas generales"}
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        <SummaryTile
          title={numberOfOrders}
          subTitle={"Ordenes totales"}
          icon={<CreditCardOutlined color="secondary" sx={{ fontSize: 50 }} />}
        />
        <SummaryTile
          title={paidOrders}
          subTitle={"Ordenes pagadas"}
          icon={<AttachMoneyOutlined color="error" sx={{ fontSize: 50 }} />}
        />
        <SummaryTile
          title={notPaidOrders}
          subTitle={"Ordenes pendientes"}
          icon={
            <CreditCardOffOutlined color="secondary" sx={{ fontSize: 50 }} />
          }
        />
        <SummaryTile
          title={numberOfClients}
          subTitle={"Clientes"}
          icon={<GroupsOutlined color="secondary" sx={{ fontSize: 50 }} />}
        />
        <SummaryTile
          title={numberOfProducts}
          subTitle={"Productos"}
          icon={<CategoryOutlined color="warning" sx={{ fontSize: 50 }} />}
        />
        <SummaryTile
          title={productsWithNoInventory}
          subTitle={"Sin existencias"}
          icon={
            <CancelPresentationOutlined color="warning" sx={{ fontSize: 50 }} />
          }
        />
        <SummaryTile
          title={lowInventory}
          subTitle={"Bajo inventario"}
          icon={
            <ProductionQuantityLimitsOutlined
              color="warning"
              sx={{ fontSize: 50 }}
            />
          }
        />
        <SummaryTile
          title={refreshIn}
          subTitle={"Actualización en: "}
          icon={<AccessTimeOutlined color="warning" sx={{ fontSize: 50 }} />}
        />
      </Grid>
    </AdminLayout>
  );
};

export default DashboardPage;
