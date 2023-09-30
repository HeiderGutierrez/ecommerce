import { ShopLayout } from "@/components/layouts";
import { countries, jwtToken } from "@/utils";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import { CartContext } from "@/context";

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
};

const getAddressFromCookies = (): FormData => {
  return {
    firstName: Cookies.get("firstName") || "",
    lastName: Cookies.get("lastName") || "",
    address: Cookies.get("address") || "",
    address2: Cookies.get("address2") || "",
    zip: Cookies.get("zip") || "",
    city: Cookies.get("city") || "",
    country: Cookies.get("country") || "",
    phone: Cookies.get("phone") || "",
  };
};

const AddressPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      address2: "",
      zip: "",
      city: "",
      country: countries[0].code,
      phone: "",
    },
  });
  const router = useRouter();
  const { updateAddress } = useContext(CartContext);
  const onSubmit = (data: FormData) => {
    updateAddress(data);
    router.push("/checkout/summary");
  };
  useEffect(() => {
    reset(getAddressFromCookies());
  }, [reset]);
  return (
    <ShopLayout
      title="Dirección"
      pageDescription="Confirmar dirección de destino"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h1" component={"h1"} mb={2}>
          Address
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.firstName}>
              <InputLabel required>First Name</InputLabel>
              <OutlinedInput
                sx={{ borderRadius: 0 }}
                type="text"
                label="First Name"
                size="medium"
                {...register("firstName", {
                  required: "This field is required",
                })}
              />
              <FormHelperText>{errors.firstName?.message}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.lastName}>
              <InputLabel required>Last Name</InputLabel>
              <OutlinedInput
                sx={{ borderRadius: 0 }}
                type="text"
                label="Last Name"
                size="medium"
                {...register("lastName", {
                  required: "This field is required",
                })}
              />
              <FormHelperText>{errors.lastName?.message}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.address}>
              <InputLabel required>Address</InputLabel>
              <OutlinedInput
                sx={{ borderRadius: 0 }}
                type="text"
                label="Address"
                size="medium"
                {...register("address", {
                  required: "This field is required",
                })}
              />
              <FormHelperText>{errors.address?.message}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Address 2 (Optional)</InputLabel>
              <OutlinedInput
                sx={{ borderRadius: 0 }}
                type="text"
                label="Address 2 (Optional)"
                size="medium"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.zip}>
              <InputLabel required>Zip Code</InputLabel>
              <OutlinedInput
                sx={{ borderRadius: 0 }}
                type="text"
                label="Zip Code"
                size="medium"
                {...register("zip", {
                  required: "This field is required",
                })}
              />
              <FormHelperText>{errors.zip?.message}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.city}>
              <InputLabel required>City</InputLabel>
              <OutlinedInput
                sx={{ borderRadius: 0 }}
                type="text"
                label="City"
                size="medium"
                {...register("city", {
                  required: "This field is required",
                })}
              />
              <FormHelperText>{errors.city?.message}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.country}>
              <InputLabel required>Country</InputLabel>
              <OutlinedInput
                sx={{ borderRadius: 0 }}
                type="text"
                label="Country"
                size="medium"
                {...register("country", {
                  required: "This field is required",
                })}
              />
              <FormHelperText>{errors.country?.message}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.phone}>
              <InputLabel required>Phone</InputLabel>
              <OutlinedInput
                sx={{ borderRadius: 0 }}
                type="text"
                label="Phone"
                size="medium"
                {...register("phone", {
                  required: "This field is required",
                })}
              />
              <FormHelperText>{errors.phone?.message}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Box sx={{ mt: 5, display: "flex", justifyContent: "flex-end"}}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size={"large"}
            sx={{width: {xs: '100%', md: 'auto'}}}
          >
            Check Order
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

export default AddressPage;
