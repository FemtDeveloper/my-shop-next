import { useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import {
  Link,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Chip,
} from "@mui/material";

import { CartContext } from "../../context";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import { CartList, OrderSummary } from "../../components/cart";
// import { countries } from '../../utils';

const SummaryPage = () => {
  const router = useRouter();
  const { shippingAddress, numberOfItems, createOrder } =
    useContext(CartContext);

  const [isPosting, setIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!Cookies.get("firstName")) {
      router.push("/checkout/address");
    }
  }, [router]);

  const onCreateOrder = async () => {
    setIsPosting(true);
    Cookies.remove("cart");

    const { hasError, message } = await createOrder();

    if (hasError) {
      setIsPosting(false);
      setErrorMessage(message);
      return;
    }

    router.replace(`/orders/${message}`);
  };

  if (!shippingAddress) {
    return <></>;
  }

  const {
    firstName,
    lastName,
    address,
    address2 = "",
    city,
    country,
    phone,
    zip,
  } = shippingAddress;

  return (
    <ShopLayout
      title="Resumen de orden"
      pageDescription={"Resumen de la orden"}
    >
      <Typography variant="h1" component="h1">
        Resumen de la orden
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Resumen ({numberOfItems}{" "}
                {numberOfItems === 1 ? "producto" : "productos"})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">
                  Dirección de entrega
                </Typography>
                <NextLink href="/checkout/address" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <Typography>
                {firstName} {lastName}
              </Typography>
              <Typography>
                {address}
                {address2 ? `, ${address2}` : ""}{" "}
              </Typography>
              <Typography>
                {city}, {zip}
              </Typography>
              {/* <Typography>{ countries.find( c => c.code === country )?.name }</Typography> */}
              <Typography>{country}</Typography>
              <Typography>{phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  onClick={onCreateOrder}
                  disabled={isPosting}
                >
                  Confirmar Orden
                </Button>

                <Chip
                  color="error"
                  label={errorMessage}
                  sx={{ display: errorMessage ? "flex" : "none", mt: 2 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
// import React, { useContext, useEffect, useState } from "react";
// // import { GetServerSideProps } from "next";

// import NextLink from "next/link";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Chip,
//   Divider,
//   Grid,
//   Link,
//   Typography,
// } from "@mui/material";
// import { CartList, OrderSummary } from "../../components/cart";
// import { ShopLayout } from "../../components/layouts";
// import { countries, jwt } from "../../utils";
// import { CartContext } from "../../context";
// import { useRouter } from "next/router";
// import Cookies from "js-cookie";

// const SummaryPage = () => {
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isPosting, setIsPosting] = useState(false);

//   const { shippingAddress, numberOfItems, createOrder } =
//     useContext(CartContext);
//   const router = useRouter();

//   useEffect(() => {
//     if (!Cookies.get("firstName")) {
//       router.push("/checkout/address");
//     }
//   }, [router]);

//   if (!shippingAddress) {
//     return <></>;
//   }
//   const {
//     firstName,
//     lastName,
//     address,
//     address2 = "",
//     phone,
//     zip,
//     country,
//     city,
//   } = shippingAddress;
//   const onCreateOrder = async () => {
//     setIsPosting(true);
// Cookies.remove("cart");
//     const { hasError, message } = await createOrder();
//     if (hasError) {
//       setIsPosting(false);
//       setErrorMessage(message);
//       return;
//     }
//     router.replace(`/orders/${message}`);
//   };

//   return (
//     <ShopLayout
//       title="Resumen de la Compra"
//       pageDescription="Resumen de la Compra"
//     >
//       <Typography variant="h1" component="h1">
//         Resumen de la compra
//       </Typography>
//       <Grid container mt={3}>
//         <Grid item xs={12} sm={7}>
//           <CartList />
//         </Grid>
//         <Grid item xs={12} sm={5}>
//           <Card className="summary-card">
//             <CardContent>
//               <Typography variant="h2">
//                 Resumen {numberOfItems}{" "}
//                 {numberOfItems > 1 ? "Productos" : "Producto"}{" "}
//               </Typography>
//               <Divider sx={{ marginY: 2 }} />
//               <Box display="flex" justifyContent="end">
//                 <NextLink href="/checkout/address" passHref>
//                   <Link underline="always">Editar</Link>
//                 </NextLink>
//               </Box>
//               <Typography variant="subtitle1">Dirección de Entrega</Typography>
//               <Typography>
//                 {firstName} {lastName}
//               </Typography>
//               <Typography>
//                 {address} {address2 ? `, Opcional: ${address2}` : ""}
//               </Typography>
//               <Typography>Código Postal: {zip} </Typography>
//               <Typography>
//                 {city}, {countries.find((c) => c.code === country)?.name}
//               </Typography>
//               <Typography>{phone}</Typography>
//               <Divider sx={{ marginY: 2 }} />
//               <Box display="flex" justifyContent="end">
//                 <NextLink href="/cart" passHref>
//                   <Link underline="always">Editar</Link>
//                 </NextLink>
//               </Box>
//               <OrderSummary />
//               <Box sx={{ mt: 2 }} display="flex" flexDirection="column">
//                 <Button
//                   color="secondary"
//                   className="circular-btn"
//                   fullWidth
//                   onClick={onCreateOrder}
//                   disabled={isPosting}
//                 >
//                   Confirmar orden
//                 </Button>
//                 <Chip
//                   label={errorMessage}
//                   color="error"
//                   sx={{ display: errorMessage ? "flex" : "none", mt: 2 }}
//                 />
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </ShopLayout>
//   );
// };

// // export const getServerSideProps: GetServerSideProps = async ({ req }) => {
// //   const { token = "" } = req.cookies;
// //   let userId = "";
// //   let isValidToken = false;
// //   try {
// //     userId = await jwt.isValidToken(token);
// //     isValidToken = true;
// //   } catch (error) {
// //     isValidToken = false;
// //   }
// //   if (!isValidToken) {
// //     return {
// //       redirect: {
// //         destination: "/auth/login?p=/checkout/summary",
// //         permanent: false,
// //       },
// //     };
// //   }

// //   return {
// //     props: {},
// //   };
// // };

// export default SummaryPage;
