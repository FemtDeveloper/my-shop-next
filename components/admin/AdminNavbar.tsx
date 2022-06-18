import { useContext } from "react";
import NextLink from "next/link";

import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material";

import { UiContext } from "../../context";

export const AdminNavbar = () => {
  const { toggleSideMenu } = useContext(UiContext);

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography variant="h1">Madrugón |</Typography>
            <Typography sx={{ ml: 0.2 }}>Mayorista</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <Button onClick={toggleSideMenu} color="success">
          Menú
        </Button>
      </Toolbar>
    </AppBar>
  );
};
