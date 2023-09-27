import {
  Box,
  Button,
  Divider,
  FilledInput,
  FormControl,
  Grid,
  ImageList,
  ImageListItem,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import {
  ArrowForwardOutlined,
  FacebookOutlined,
  Instagram,
  LinkedIn,
  Pinterest,
  Twitter,
} from "@mui/icons-material";
import Image from "next/image";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
];

export const Footer = () => {
  return (
    <Box sx={{ background: "#1E1E1E", width: "100%" }}>
      <Box
        sx={{
          margin: "0 auto",
          maxWidth: "1400px",
          width: "100%",
        }}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"} alignItems={"center"} gap={4} py={3}>
            <Typography
              variant="subtitle1"
              sx={{ color: "#B7B7B7" }}
              fontSize={14}
            >
              LAST CHANCE TO WIN OUR DISCOUNT!
            </Typography>
            <TextField
              placeholder="Enter your email..."
              type="email"
              sx={{
                color: "#B7B7B7",
                background: "#303030",
                borderRadius: 0,
                height: "100%",
              }}
              InputProps={{
                endAdornment: (
                  <Button
                    variant="text"
                    size="small"
                    sx={{ color: "#B7B7B7" }}
                    endIcon={<ArrowForwardOutlined />}
                  >
                    SUSCRIBE
                  </Button>
                ),
              }}
            />
          </Box>
          <Box display={"flex"} alignItems={"center"} gap={4} py={3}>
            <Typography
              variant="subtitle1"
              sx={{ color: "#B7B7B7" }}
              fontSize={14}
            >
              ON SOCIAL NETWORKS
            </Typography>
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <Link sx={{ color: "#B7B7B7" }} href="www.facebook.com">
                <FacebookOutlined sx={{ fontSize: 18 }} />
              </Link>
              <Link sx={{ color: "#B7B7B7" }} href="www.twitter.com">
                <Twitter sx={{ fontSize: 18 }} />
              </Link>
              <Link sx={{ color: "#B7B7B7" }} href="www.linkedin.com">
                <LinkedIn sx={{ fontSize: 18 }} />
              </Link>
              <Link sx={{ color: "#B7B7B7" }} href="www.instagram.com">
                <Instagram sx={{ fontSize: 18 }} />
              </Link>
              <Link sx={{ color: "#B7B7B7" }} href="www.pinterest.com">
                <Pinterest sx={{ fontSize: 18 }} />
              </Link>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ background: "#9f9f9f1a" }} />
        <Box py={3}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Typography variant="h2" sx={{ color: "#B7B7B7" }} mb={1}>
                Expression
              </Typography>
              <Typography variant="body1">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry lorem Ipsum is simply dummy text of industry lorem
                ipsum is simply dummy typesetting text.
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                variant="h2"
                textTransform={"uppercase"}
                fontSize={14}
                sx={{ color: "#B7B7B7" }}
              >
                CATEGORIES
              </Typography>
              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <Link href="/category/men">
                    <Typography variant="body1">Men</Typography>
                  </Link>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <Link href="/category/women">
                    <Typography variant="body1">Women</Typography>
                  </Link>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <Link href="/category/kids">
                    <Typography variant="body1">Kids</Typography>
                  </Link>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={2}>
              <Typography
                variant="h2"
                textTransform={"uppercase"}
                fontSize={14}
                sx={{ color: "#B7B7B7" }}
              >
                CUSTOMER
              </Typography>
              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <Link href="/category/men">
                    <Typography variant="body1">Help and support</Typography>
                  </Link>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <Link href="/category/women">
                    <Typography variant="body1">
                      Shipping and delivery
                    </Typography>
                  </Link>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <Link href="/category/kids">
                    <Typography variant="body1">Payment method</Typography>
                  </Link>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <Link href="/category/kids">
                    <Typography variant="body1">
                      Terms and conditions
                    </Typography>
                  </Link>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <Link href="/category/kids">
                    <Typography variant="body1">Privacy policy</Typography>
                  </Link>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={2}>
              <Typography
                variant="h2"
                textTransform={"uppercase"}
                fontSize={14}
                sx={{ color: "#B7B7B7" }}
              >
                COMPANY
              </Typography>
              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <Link href="/category/men">
                    <Typography variant="body1">About company</Typography>
                  </Link>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <Link href="/category/women">
                    <Typography variant="body1">Our services</Typography>
                  </Link>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <Link href="/category/kids">
                    <Typography variant="body1">Get the voucher</Typography>
                  </Link>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <Link href="/category/kids">
                    <Typography variant="body1">Store locator</Typography>
                  </Link>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <Link href="/category/kids">
                    <Typography variant="body1">Contact us</Typography>
                  </Link>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={2}>
              <Typography
                variant="h2"
                textTransform={"uppercase"}
                fontSize={14}
                sx={{ color: "#B7B7B7" }}
              >
                FOLLOW US ON INSTAGRAM
              </Typography>
              <ImageList cols={4}>
                {itemData.map((item) => (
                  <ImageListItem key={item.img}>
                    <Image
                      src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                      alt={item.title}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ background: "#9f9f9f1a" }} />
        <Box py={3}>
          <Typography variant="body1">
            © 2023 Expression | Designed and coded with ❤ by Heider Gutierrez
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
