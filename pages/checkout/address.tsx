import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { ShopLayout } from "../../components/layouts";

const address = () => {
  return (
    <ShopLayout
      title="Datos de envío"
      pageDescription="Datos de envió del comprador"
    >
      <Typography variant="h1" component="h1">
        Dirección
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
          <TextField label="Nombre" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
          <TextField label="Apellido" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
          <TextField label="Dirección" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
          <TextField
            label="Dirección 2 (opcional)"
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
          <TextField label="Código postal" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
          <TextField label="Ciudad" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel>País</InputLabel>
            <Select variant="filled" label="País" value={1}>
              <MenuItem value={1}>Colombia</MenuItem>
              <MenuItem value={2}>Vanezuela</MenuItem>
              <MenuItem value={3}>Panamá</MenuItem>
              <MenuItem value={4}>Ecuador</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
          <TextField label="Teléfono" variant="filled" fullWidth />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="end" sx={{ mt: 5 }}>
        <Button
          color="secondary"
          className="circular-btn"
          sx={{ fontSize: "18px" }}
        >
          Revisar pedido
        </Button>
      </Box>
    </ShopLayout>
  );
};

export default address;
