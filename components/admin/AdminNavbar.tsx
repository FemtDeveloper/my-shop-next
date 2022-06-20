import { useContext } from "react";
import NextLink from "next/link";

import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material";

import { UiContext } from "../../context";

export const AdminNavbar = () => {
  const { toggleSideMenu } = useContext(UiContext);

  return (
    <AppBar>
      <Toolbar style={{ backgroundColor: "darkcyan" }}>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography
              variant="h1"
              sx={{ display: { xs: "flex", sm: "none" } }}
              color="whitesmoke"
            >
              M | m
            </Typography>
            <Typography
              variant="h1"
              color={"whitesmoke"}
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              Madrugón |
            </Typography>
            <Typography
              color="whitesmoke"
              sx={{ ml: 0.2, display: { xs: "none", sm: "flex" } }}
            >
              Mayorista
            </Typography>
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
