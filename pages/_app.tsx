import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { lightTheme } from "../themes";
import { SWRConfig } from "swr";
import { AuthProvider, UiProvider } from "../context";
import { CartProvider } from "../context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <PayPalScriptProvider
        options={{
          "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
        }}
      >
        <SWRConfig
          value={{
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json()),
          }}
        >
          <AuthProvider isLoggedIn={false}>
            <CartProvider
              isLoaded
              cart={[]}
              numberOfItems={0}
              subTotal={0}
              tax={0}
              total={0}
            >
              <UiProvider isMenuOpen>
                <ThemeProvider theme={lightTheme}>
                  <Component {...pageProps} />
                </ThemeProvider>
              </UiProvider>
            </CartProvider>
          </AuthProvider>
        </SWRConfig>
      </PayPalScriptProvider>
    </SessionProvider>
  );
}

export default MyApp;
