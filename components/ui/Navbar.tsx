import NextLink from "next/link";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { CartContext, UiContext } from "../../context";

export const Navbar = () => {
  const { pathname, push } = useRouter();
  const { toggleSideMenu } = useContext(UiContext);
  const { numberOfItems } = useContext(CartContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <AppBar>
      <Toolbar style={{ backgroundColor: "darkcyan" }}>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography
              variant="h6"
              color={"whitesmoke"}
              sx={{ display: { xs: "flex", sm: "none" } }}
            >
              M | M
            </Typography>
            <Typography
              variant="h1"
              color={"whitesmoke"}
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              Madrugón |
            </Typography>
            <Typography
              sx={{ ml: 0.2, display: { xs: "none", sm: "flex" } }}
              color={"whitesmoke"}
              variant="h2"
            >
              Mayorista
            </Typography>
          </Link>
        </NextLink>
        <Box flex={1} />

        <Box
          sx={{
            display: isSearchVisible ? "none" : { xs: "none", sm: "block" },
          }}
          className="fadeIn"
        >
          <NextLink href="/category/men" passHref>
            <Link>
              <Button
                sx={{
                  backgroundColor:
                    pathname === "/category/men" ? "whitesmoke" : "darkcyan",
                  color:
                    pathname === "/category/men" ? "darkcyan" : "whitesmoke",
                }}
              >
                Hombres
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/women" passHref>
            <Link>
              <Button
                sx={{
                  backgroundColor:
                    pathname === "/category/women" ? "whitesmoke" : "darkcyan",
                  color:
                    pathname === "/category/women" ? "darkcyan" : "whitesmoke",
                }}
              >
                Mujeres
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/kids" passHref>
            <Link>
              <Button
                sx={{
                  backgroundColor:
                    pathname === "/category/kids" ? "whitesmoke" : "darkcyan",
                  color:
                    pathname === "/category/kids" ? "darkcyan" : "whitesmoke",
                }}
              >
                Niños/as
              </Button>
            </Link>
          </NextLink>
        </Box>
        <Box flex={1} />

        {isSearchVisible ? (
          <Input
            sx={{ display: { xs: "none", sm: "flex" } }}
            className="fadeIn"
            autoFocus={true}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
            placeholder="Buscar..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setIsSearchVisible(false)}>
                  <ClearOutlined sx={{ color: "whitesmoke" }} />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            onClick={() => setIsSearchVisible(true)}
            className="fadeIn"
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            <SearchOutlined sx={{ color: "whitesmoke" }} />
          </IconButton>
        )}
        <IconButton
          sx={{ display: { xs: "flex", sm: "none" } }}
          onClick={toggleSideMenu}
        >
          <SearchOutlined sx={{ color: "whitesmoke" }} />
        </IconButton>
        <NextLink href="/cart" passHref>
          <Link>
            <IconButton sx={{ color: "whitesmoke" }}>
              <Badge badgeContent={numberOfItems} color="info">
                <ShoppingCartOutlined
                  color="primary"
                  sx={{ backgroundColor: "transparent" }}
                />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>
        <Button color="success" onClick={toggleSideMenu}>
          Menú
        </Button>
      </Toolbar>
    </AppBar>
  );
};
