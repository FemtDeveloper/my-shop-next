import type { NextPage } from "next";
import { Typography } from "@mui/material";
// import styles from "../styles/Home.module.css";
import { ShopLayout } from "../components/layouts";
import { ProductList } from "../components/products";
import { useProducts } from "../hooks";
import { FullScreenLoading } from "../components/ui";

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts("/products");

  return (
    <ShopLayout
      title={"Madrugon Mayorista"}
      pageDescription={"Promociones del Madrugón en Bogotá"}
    >
      <Typography variant="h1" component="h1" color={"#4e4e4e"}>
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }} color={"#4e4e4e"}>
        Todos los productos:
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default HomePage;
