import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { getSession, signIn, getProviders } from "next-auth/react";
import { ErrorOutline } from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { AuthLayout, ShopLayout } from "../../components/layouts";
import { validations } from "../../utils";
import { display } from "@mui/system";
import Facebook from "next-auth/providers/facebook";

// import { tesloApi } from "../../api";
// import { AuthContext } from "../../context";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  // const { loginUser } = useContext(AuthContext);
  const [showError, setShowError] = useState(false);
  const [providers, setProviders] = useState<any>({});

  const router = useRouter();

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);
  const { credentials, github, google, facebook } = providers;

  console.log(providers);
  console.log(github);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);

    await signIn("credentials", { email, password });

    // const isValidLogin = await loginUser(email, password);
    // if (!isValidLogin) {
    //   setShowError(true);
    //   setTimeout(() => {
    //     setShowError(false);
    //   }, 3000);
    //   return;
    // }
    // const destination = router.query.p?.toString() || "/";
    // router.replace(destination);
  };

  return (
    <ShopLayout
      title={"Ingreso"}
      pageDescription={"Página de ingreso de usuario de Madrugó Mayorista"}
    >
      <AuthLayout title={"Login"}>
        <form onSubmit={handleSubmit(onLoginUser)} noValidate>
          <Box
            sx={{
              padding: "10px 20px",
              width: { sm: 360 },
            }}
            mt={18}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h1" component="h1">
                  Iniciar sesión
                </Typography>
                <Chip
                  label="Usuario y/o Contraseña incorrecto"
                  color="error"
                  icon={<ErrorOutline />}
                  className="fadeIn"
                  sx={{ display: showError ? "flex" : "none" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Correo"
                  variant="filled"
                  type="email"
                  fullWidth
                  {...register("email", {
                    required: "Este campo es requerido",
                    validate: validations.isEmail,
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Contraseña"
                  type="password"
                  variant="filled"
                  fullWidth
                  {...register("password", {
                    required: "Este campo es requerido",
                    minLength: { value: 6, message: "Mínimo 6 Caracteres" },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  className="circular-btn"
                  size="large"
                  fullWidth
                  sx={{
                    mb: 2,
                    backgroundColor: "darkcyan",
                  }}
                >
                  Ingresar
                </Button>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="end">
                <NextLink
                  href={
                    router.query.p
                      ? `/auth/register/?p=${router.query.p}`
                      : "/auth/register"
                  }
                  passHref
                >
                  <Link underline="always">¿No tienes cuenta?</Link>
                </NextLink>
              </Grid>
              <Grid
                item
                xs={12}
                display="flex"
                justifyContent="end"
                flexDirection="column"
              >
                <Divider sx={{ width: "100%", mb: 2 }} />
                <Button
                  onClick={() => signIn(github.id)}
                  fullWidth
                  sx={{
                    mb: 2,
                    backgroundColor: "darkcyan",
                  }}
                >
                  <GitHubIcon sx={{ mr: 2 }} />
                  Github
                </Button>
                <Button
                  onClick={() => signIn(facebook.id)}
                  variant="outlined"
                  fullWidth
                  sx={{
                    mb: 2,
                    backgroundColor: "darkcyan",
                  }}
                >
                  <FacebookIcon sx={{ mr: 2 }} />
                  Facebook
                </Button>
                <Button
                  onClick={() => signIn(google.id)}
                  fullWidth
                  sx={{
                    mb: 2,
                    backgroundColor: "darkcyan",
                  }}
                  variant="outlined"
                >
                  <GoogleIcon sx={{ mr: 2 }} />
                  Google
                </Button>

                {/* {Object.values(providers).map((provider: any, i) => {
                  if (provider.id === "credentials")
                    return <div key="credentials"></div>;

                  return (
                    <Button
                      key={provider.id}
                      variant="contained"
                      fullWidth
                      // color="success"
                      sx={{ mb: 2, backgroundColor: "indigo" }}
                      onClick={() => signIn(provider.id)}
                    >
                      {provider.name}
                    </Button>
                  );
                })} */}
              </Grid>
            </Grid>
          </Box>
        </form>
      </AuthLayout>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });

  const { p = "/" } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
