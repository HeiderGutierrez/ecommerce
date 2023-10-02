import { tesloApi } from "@/axiosApi";
import { AuthLayout } from "@/components/layouts";
import { AuthContext } from "@/context";
import { validations } from "@/utils";
import { ErrorOutline, Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Chip, FilledInput, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, Link, TextField, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { authOptions } from "../api/auth/[...nextauth]";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  const { registerUser } = useContext(AuthContext);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit: SubmitHandler<FormData> = async ({ name, email, password }) => {
    setShowError(false);
    const {hasError, message} = await registerUser(name, email, password);
    if(hasError){
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
      return;
    }
    await signIn("credentials", { email, password });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <AuthLayout title="Registro">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ width: 350, padding: {xs: '20px', md: '50px'} }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component={"h1"}>
                Crear Cuenta
              </Typography>
              {showError && (
                <Chip
                  color="error"
                  variant="outlined"
                  label="Ya existe un usuario registrado con el mismo correo"
                  icon={<ErrorOutline />}
                  className="fadeIn"
                  sx={{width: '100%', mt: 1}}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                label="Nombre Completo"
                variant="filled"
                fullWidth
                size="small"
                {...register("name", {
                    required: "Este campo es obligatorio",
                  })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Correo"
                variant="filled"
                fullWidth
                size="small"
                {...register("email", {
                  required: "Este campo es obligatorio",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="filled" fullWidth error={!!errors.password}>
                <InputLabel htmlFor="filled-adornment-password">
                  Password
                </InputLabel>
                <FilledInput
                  id="filled-adornment-password"
                  type={showPassword ? "text" : "password"}
                  size="small"
                  {...register("password", {
                    required: "Este campo es obligatorio",
                    minLength: {
                      value: 6,
                      message: "Debe tener minimo 6 caracteres",
                    },
                  })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText>{errors.password?.message}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth color="primary" size="large" variant="contained">
                Registrarse
              </Button>
            </Grid>
            <Grid item xs={12} textAlign={"center"}>
              <NextLink href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'} passHref legacyBehavior>
                <Link>
                  <Typography>¿Ya tienes una cuenta?</Typography>
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const session = await getServerSession(req, res, authOptions);

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

export default RegisterPage;
