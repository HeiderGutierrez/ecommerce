import { AuthLayout } from "@/components/layouts";
import { validations } from "@/utils";
import { ErrorOutline, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { GetServerSideProps } from "next";
import { signIn, getProviders, getSession } from "next-auth/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
    setShowError(false);
    await signIn("credentials", { email, password });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <AuthLayout title="Ingresar">
      <Box
        sx={{
          width: {xs: '100%', md: 450},
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="subtitle1" fontSize={20} fontWeight={500} mb={3}>
          Login
        </Typography>
        <Box
          sx={{
            width: "100%",
            padding: { xs: "20px", md: "55px" },
            background: "#F7F7F7",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} style={{width: '100%'}}>
            <Grid container gap={3}>
              <Grid item xs={12}>
                {showError && (
                  <Chip
                    color="error"
                    variant="outlined"
                    label="User not registered"
                    icon={<ErrorOutline />}
                    className="fadeIn"
                    sx={{ width: "100%", mt: 1 }}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" error={!!errors.email} fullWidth>
                  <label htmlFor="outlined-email" style={{marginBottom: 12, fontFamily: 'Source Sans Pro ,sans-serif', fontSize: 14}}>
                    Email
                  </label>
                  <OutlinedInput
                    type="email"
                    id="outlined-email"
                    size="small"
                    sx={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 0
                    }}
                    {...register("email", {
                      required: "This field is required",
                      validate: validations.isEmail,
                    })}
                  />
                  <FormHelperText>{errors.email?.message}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth error={!!errors.password}>
                  <label htmlFor="outlined-password" style={{marginBottom: 12, fontFamily: 'Source Sans Pro ,sans-serif', fontSize: 14}}>
                    Password
                  </label>
                  <OutlinedInput
                    id="outlined-password"
                    type={showPassword ? "text" : "password"}
                    size="small"
                    sx={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 0
                    }}
                    {...register("password", {
                      required: "This field is required",
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
                <Button
                  type="submit"
                  fullWidth
                  color="secondary"
                  size="large"
                  variant="contained"
                >
                  LOG IN
                </Button>
              </Grid>
              <Grid item xs={12} textAlign={"center"}>
                <NextLink
                  href={
                    router.query.p
                      ? `/auth/register?p=${router.query.p}`
                      : "/auth/register"
                  }
                  passHref
                  legacyBehavior
                >
                  <Link>
                    <Typography>Don&apos;t have an account?</Typography>
                  </Link>
                </NextLink>
              </Grid>
              <Grid item xs={12} textAlign={"center"}>
                <Divider sx={{ width: "100%", mb: 2 }} />
                {Object.values(providers).map((provider: any) => {
                  if (provider.id === "credentials") {
                    return <div key={provider.id}></div>;
                  }
                  return (
                    <Button
                      key={provider.id}
                      variant="outlined"
                      fullWidth
                      color="secondary"
                      sx={{ mb: 1 }}
                      onClick={() => signIn(provider.id)}
                    >
                      {provider.name}
                    </Button>
                  );
                })}
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </AuthLayout>
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
