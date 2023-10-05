import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { GetServerSideProps } from "next";
import { AdminLayout } from "../../../components/layouts";
import { IProduct } from "../../../interfaces";
import {
  DeleteOutlineOutlined,
  DriveFileRenameOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import { dbProducts } from "../../../database";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  ListItem,
  Paper,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { tesloApi } from "@/axiosApi";
import { useRouter } from "next/router";
import { Product } from "@/models";
import Upload from "../../../public/icons/upload.svg";

const validTypes = ["shirts", "pants", "hoodies", "hats"];
const validGender = ["men", "women", "kid", "unisex"];
const validSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

interface FormData {
  _id?: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: string[];
  slug: string;
  tags: string[];
  title: string;
  type: string;
  gender: string;
}

interface Props {
  product: IProduct;
}

const ProductAdminPage = ({ product }: Props) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newTagValue, setNewTagValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isBackdrop, setIsBackdrop] = useState(false);
  const [isSnackbar, setIsSnackbar] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: product,
  });

  useEffect(() => {
    const suscription = watch((value, { name }) => {
      if (name === "title") {
        const newSlug =
          value.title
            ?.trim()
            .replaceAll(" ", "_")
            .replaceAll("'", "")
            .toLowerCase() || "";
        setValue("slug", newSlug);
      }
    });

    return () => {
      suscription.unsubscribe();
    };
  }, [watch, setValue]);

  const onNewTag = () => {
    const newTag = newTagValue.trim().toLowerCase();
    setNewTagValue("");
    const currentTags = getValues("tags");
    if (currentTags.includes(newTag)) {
      return;
    }
    currentTags.push(newTag);
    setValue("tags", currentTags, { shouldValidate: true });
  };

  const onDeleteTag = (tag: string) => {
    const updatedTags = getValues("tags").filter((t) => t !== tag);
    setValue("tags", updatedTags, { shouldValidate: true });
  };

  const onSubmitForm = async (form: FormData) => {
    if (form.images.length < 2) return alert("Mínimo 2 imágenes");
    setIsSaving(true);
    try {
      setIsBackdrop(true);
      const { data } = await tesloApi({
        url: "/admin/products",
        method: form._id ? "PUT" : "POST",
        data: form,
      });
      console.log({ data });
      if (!form._id) {
        router.replace(`/admin/products/${form.slug}`);
      } else {
        setIsSaving(false);
        setIsBackdrop(false);
        setIsSnackbar(true);
      }
    } catch (error) {
      setIsSaving(false);
      console.log(error);
    }
  };

  const onChangeSize = (size: string) => {
    const currentSizes = getValues("sizes");
    if (currentSizes.includes(size)) {
      return setValue(
        "sizes",
        currentSizes.filter((s) => s !== size),
        { shouldValidate: true }
      );
    }
    setValue("sizes", [...currentSizes, size], { shouldValidate: true });
  };

  const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }
    try {
      for (const file of target.files) {
        const formData = new FormData();
        formData.append("file", file);
        const { data } = await tesloApi.post<{ message: string }>(
          "/admin/upload",
          formData
        );
        console.log(data.message);
        setValue("images", [...getValues("images"), data.message], {
          shouldValidate: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteImage = (img: string) => {
    const deleteImages = getValues("images").filter((i) => i !== img);
    setValue("images", deleteImages, { shouldValidate: true });
  };

  return (
    <>
      <AdminLayout
        title={"Admin | Add Product"}
        subTitle={`Editando: ${product.title}`}
        icon={<DriveFileRenameOutline />}
      >
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <Box
            display="flex"
            justifyContent="end"
            sx={{
              mb: 3,
              width: "100%",
              ".MuiOutlinedInput-root": {
                borderRadius: 0,
              },
            }}
          >
            <Button
              color="primary"
              variant="contained"
              startIcon={<SaveOutlined />}
              sx={{ width: "150px" }}
              type="submit"
              disabled={isSaving}
            >
              Guardar
            </Button>
          </Box>

          <Grid container spacing={2}>
            {/* Data */}
            <Grid item xs={12} display={'grid'} gap={4}>
              <TextField
                label="Título"
                variant="outlined"
                size="medium"
                sx={{
                  width: '100%',
                  ".MuiOutlinedInput-root": {
                    borderRadius: 0,
                  },
                }}
                {...register("title", {
                  required: "Este campo es requerido",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                })}
                error={!!errors.title}
                helperText={errors.title?.message}
              />

              <TextField
                label="Slug - URL"
                variant="outlined"
                size="medium"
                sx={{
                  width: '100%',
                  ".MuiOutlinedInput-root": {
                    borderRadius: 0,
                  },
                }}
                {...register("slug", {
                  required: "Este campo es requerido",
                  validate: (val) =>
                    val.trim().includes(" ")
                      ? "No se pueden tener espaciós en blanco"
                      : undefined,
                })}
                error={!!errors.slug}
                helperText={errors.slug?.message}
              />

              <TextField
                label="Descripción"
                variant="outlined"
                size="medium"
                multiline
                maxRows={4}
                sx={{
                  width: "100%",
                  ".MuiOutlinedInput-root": {
                    borderRadius: 0,
                  },
                }}
                {...register("description", {
                  required: "Este campo es requerido",
                })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />

              <TextField
                label="Inventario"
                type="number"
                variant="outlined"
                size="medium"
                sx={{
                  width: '100%',
                  ".MuiOutlinedInput-root": {
                    borderRadius: 0,
                  },
                }}
                {...register("inStock", {
                  required: "Este campo es requerido",
                  minLength: {
                    value: 0,
                    message: "El valor mínimo debe ser 0",
                  },
                })}
                error={!!errors.inStock}
                helperText={errors.inStock?.message}
              />

              <TextField
                label="Precio"
                type="number"
                variant="outlined"
                size="medium"
                sx={{
                  width: '100%',
                  ".MuiOutlinedInput-root": {
                    borderRadius: 0,
                  },
                }}
                {...register("price", {
                  required: "Este campo es requerido",
                  minLength: {
                    value: 0,
                    message: "El valor mínimo debe ser 0",
                  },
                })}
                error={!!errors.price}
                helperText={errors.price?.message}
              />

              <FormControl
                sx={{
                  width: '100%',
                  ".MuiOutlinedInput-root": {
                    borderRadius: 0,
                  },
                }}
              >
                <FormLabel>Tipo</FormLabel>
                <RadioGroup
                  row
                  value={getValues("type")}
                  onChange={({ target }) =>
                    setValue("type", target.value, { shouldValidate: true })
                  }
                >
                  {validTypes.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio color="primary" />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <FormControl
                sx={{
                  width: '100%',
                  ".MuiOutlinedInput-root": {
                    borderRadius: 0,
                  },
                }}
              >
                <FormLabel>Género</FormLabel>
                <RadioGroup
                  row
                  value={getValues("gender")}
                  onChange={({ target }) =>
                    setValue("gender", target.value, {
                      shouldValidate: true,
                    })
                  }
                >
                  {validGender.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio color="primary" />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <FormGroup>
                <FormLabel>Tallas</FormLabel>
                {validSizes.map((size) => (
                  <FormControlLabel
                    key={size}
                    control={
                      <Checkbox checked={getValues("sizes").includes(size)} />
                    }
                    label={size}
                    onChange={() => onChangeSize(size)}
                  />
                ))}
              </FormGroup>

              <TextField
                label="Etiquetas"
                variant="outlined"
                size="medium"
                sx={{
                  width: "100%",
                  ".MuiOutlinedInput-root": {
                    borderRadius: 0,
                  },
                }}
                helperText="Presiona [spacio] para agregar"
                value={newTagValue}
                onChange={({ target }) => setNewTagValue(target.value)}
                onKeyUp={({ code }) =>
                  code === "Space" ? onNewTag() : undefined
                }
              />

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  listStyle: "none",
                  p: 0,
                  m: 0,
                }}
                component="ul"
              >
                {getValues("tags").map((tag) => {
                  return (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => onDeleteTag(tag)}
                      color="primary"
                      size="medium"
                      sx={{ ml: 1, mt: 1 }}
                    />
                  );
                })}
              </Box>
              <Box display="flex" flexDirection="column">
                <FormLabel
                  sx={{
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    ".MuiOutlinedInput-root": {
                      borderRadius: 0,
                    },
                  }}
                >
                  Imágenes
                  <Button
                    color="secondary"
                    variant="contained"
                    size="large"
                    startIcon={<UploadOutlined />}
                    sx={{ mb: 3 }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Cargar imagen
                  </Button>
                </FormLabel>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/png, image/gif, image/jpeg"
                  style={{ display: "none" }}
                  onChange={onFilesSelected}
                />

                <Chip
                  label="Es necesario al 2 imagenes"
                  color="error"
                  variant="outlined"
                  size="medium"
                  sx={{
                    display: getValues("images").length >= 2 ? "none" : "block",
                  }}
                />

                <Grid container spacing={2}>
                  {getValues("images").map((img) => (
                    <Grid item xs={4} sm={3} key={img}>
                      <Card>
                        <CardMedia
                          component="img"
                          className="fadeIn"
                          image={img}
                          alt={img}
                        />
                        <CardActions>
                          <Button
                            color="error"
                            onClick={() => onDeleteImage(img)}
                            startIcon={<DeleteOutlineOutlined />}
                          >
                            Borrar
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </form>
      </AdminLayout>
      <Backdrop
        open={isBackdrop}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="primary" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={isSnackbar}
        onClose={() => setIsSnackbar(false)}
        autoHideDuration={6000}
      >
        <Alert severity="success">Product successfully modified!</Alert>
      </Snackbar>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = "" } = query;

  let product: IProduct | null;

  if (slug === "new") {
    const tempProduct = JSON.parse(JSON.stringify(new Product()));
    delete tempProduct._id;
    tempProduct.images = ["img1.jpg", "img2.jpg"];
    product = tempProduct;
  } else {
    product = await dbProducts.getProductsBySlug(slug.toString());
  }

  if (!product) {
    return {
      redirect: {
        destination: "/admin/products",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductAdminPage;
