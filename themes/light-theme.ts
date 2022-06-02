import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#e5f3ff",
    },
    secondary: {
      main: "#3A64D8",
    },
    info: {
      main: "#fff",
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: "none",
        color: "#2c2c2c",
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: "fixed",
      },
      styleOverrides: {
        root: {
          backgroundColor: "#c2e3ff",
          height: 60,
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#2c2c2c",
        },
        h1: {
          fontSize: 30,
          fontWeight: 600,
        },
        h2: {
          fontSize: 20,
          fontWeight: 400,
        },
        subtitle1: {
          fontSize: 18,
          fontWeight: 600,
        },
      },
    },

    MuiButton: {
      defaultProps: {
        variant: "contained",
        size: "large",
        disableElevation: true,
        color: "info",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none",
          borderRadius: 10,
          background: "transparent",
          color: "#2c2c2c",
          ":hover": {
            backgroundColor: "rgba(0,0,0,0.05)",
            transition: "all 0.3s ease-in-out",
          },
        },
      },
    },

    MuiCard: {
      defaultProps: {
        elevation: 3,
      },
      styleOverrides: {
        root: {
          border: "none",
          boxShadow: "0px 5px 5px rgba(0,0,0,0.05)",
          borderRadius: "10px",
          "&:hover": {
            backgroundColor: "green",
          },
        },
      },
    },
  },
});
