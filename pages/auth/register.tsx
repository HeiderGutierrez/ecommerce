import { AuthLayout } from "@/components/layouts";
import { AuthContext } from "@/context";
import { validations } from "@/utils";
import { ErrorOutline, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
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
import { signIn, getSession } from "next-auth/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit: SubmitHandler<FormData> = async ({
    name,
    email,
    password,
  }) => {
    setShowError(false);
    const { hasError, message } = await registerUser(name, email, password);
    if (hasError) {
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
      <Box
        sx={{
          width: { xs: "100%", md: 450 },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="subtitle1" fontSize={20} fontWeight={500} mb={3}>
          Register
        </Typography>
        <Box
          sx={{
            width: "100%",
            padding: { xs: "20px", md: "55px" },
            background: "#F7F7F7",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Grid container gap={3}>
              <Grid item xs={12}>
                {showError && (
                  <Chip
                    color="error"
                    variant="outlined"
                    label="There is already a registered user with the same email address"
                    icon={<ErrorOutline />}
                    className="fadeIn"
                    sx={{ width: "100%", mt: 1 }}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
              <FormControl variant="outlined" error={!!errors.name} fullWidth>
                  <label htmlFor="outlined-name" style={{marginBottom: 12, fontFamily: 'Source Sans Pro ,sans-serif', fontSize: 14}}>
                    Full Name
                  </label>
                  <OutlinedInput
                    type="name"
                    id="outlined-name"
                    size="small"
                    sx={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 0
                    }}
                    {...register("name", {
                      required: "This field is required",
                    })}
                  />
                  <FormHelperText>{errors.name?.message}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  error={!!errors.email}
                  fullWidth
                >
                  <label
                    htmlFor="outlined-email"
                    style={{
                      marginBottom: 12,
                      fontFamily: "Source Sans Pro ,sans-serif",
                      fontSize: 14,
                    }}
                  >
                    Email
                  </label>
                  <OutlinedInput
                    type="email"
                    id="outlined-email"
                    size="small"
                    sx={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: 0,
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
                <FormControl
                  variant="outlined"
                  fullWidth
                  error={!!errors.password}
                >
                  <label
                    htmlFor="outlined-password"
                    style={{
                      marginBottom: 12,
                      fontFamily: "Source Sans Pro ,sans-serif",
                      fontSize: 14,
                    }}
                  >
                    Password
                  </label>
                  <OutlinedInput
                    id="outlined-password"
                    type={showPassword ? "text" : "password"}
                    size="small"
                    sx={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: 0,
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
                  REGISTER
                </Button>
              </Grid>
              <Grid item xs={12} textAlign={"center"}>
                <NextLink
                  href={
                    router.query.p
                      ? `/auth/login?p=${router.query.p}`
                      : "/auth/login"
                  }
                  passHref
                  legacyBehavior
                >
                  <Link>
                    <Typography>Already have an account?</Typography>
                  </Link>
                </NextLink>
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

export default RegisterPage;
