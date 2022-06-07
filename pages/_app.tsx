import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../themes";
import { SWRConfig } from "swr";
import { AuthProvider, UiProvider } from "../context";
import { CartProvider } from "../context/cart";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <AuthProvider isLoggedIn={false}>
        <CartProvider
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
  );
}

export default MyApp;
