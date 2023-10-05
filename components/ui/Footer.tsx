import {
  Box,
  Button,
  Divider,
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
import Image from "next/image";
import ArrowRight from '../../public/icons/arrow-right.svg';
import Facebook from '../../public/icons/facebook.svg';
import Github from '../../public/icons/github.svg';
import Dribbble from '../../public/icons/dribbble.svg';
import Instagram from '../../public/icons/instagram.svg';
import Twitter from '../../public/icons/twitter.svg';
import Linkedin from '../../public/icons/linkedin.svg';

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
    <Box sx={{ background: "#1E1E1E", width: "100%", mt: 10}}>
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
          sx={{
            flexDirection: { xs: "column", md: "row" },
            padding: { xs: "20px", md: 0 },
          }}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={4}
            sx={{ py: { xs: 0, md: 3 }, width: { xs: "100%", md: "auto" } }}
          >
            <Typography
              variant="subtitle1"
              sx={{ color: "#B7B7B7", display: { xs: "none", md: "block" } }}
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
                width: { xs: "100%", md: "auto" },
                ".MuiOutlinedInput-root": {
                  borderRadius: 0,
                }
              }}
              InputProps={{
                style: {
                  color: "#B7B7B7"
                },
                endAdornment: (
                  <Button
                    variant="text"
                    size="small"
                    sx={{ color: "#B7B7B7" }}
                    endIcon={<Image src={ArrowRight} alt="Arrow right icon" />}
                  >
                    SUSCRIBE
                  </Button>
                ),
              }}
            />
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={4}
            sx={{ py: { xs: 0, md: 3 }, mt: { xs: 2, mb: 0 } }}
          >
            <Typography
              variant="subtitle1"
              sx={{ color: "#B7B7B7", display: { xs: "none", md: "block" } }}
              fontSize={14}
            >
              ON SOCIAL NETWORKS
            </Typography>
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <Link href="www.facebook.com">
                <Image src={Facebook} alt="Facebook icon" />
              </Link>
              <Link href="www.twitter.com">
                <Image src={Twitter} alt="Twitter icon" />
              </Link>
              <Link href="www.linkedin.com">
                <Image src={Linkedin} alt="Linkedin icon" />
              </Link>
              <Link href="www.instagram.com">
                <Image src={Instagram} alt="Instagram icon" />
              </Link>
              <Link href="www.dribbble.com">
                <Image src={Dribbble} alt="Dribbble icon" />
              </Link>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ background: "#9f9f9f1a", width: "100%" }} />
        <Box py={3} sx={{ padding: { xs: "20px", md: '20px 0' } }}>
          <Grid
            container
            spacing={3}
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            <Grid item xs={12} md={4}>
              <Typography variant="h2" sx={{ color: "#B7B7B7" }} fontWeight={600} textTransform={'uppercase'} mb={1}>
                Expre<span style={{fontWeight: 500}}>ssion</span>
              </Typography>
              <Typography variant="body1">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry lorem Ipsum is simply dummy text of industry lorem
                ipsum is simply dummy typesetting text.
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography
                variant="h2"
                textTransform={"uppercase"}
                fontSize={14}
                sx={{ color: "#B7B7B7" }}
              >
                CATEGORIES
              </Typography>
              <List dense>
                <ListItem
                  sx={{
                    px: 0,
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Link href="/category/men">
                    <Typography variant="body1">Men</Typography>
                  </Link>
                </ListItem>
                <ListItem
                  sx={{
                    px: 0,
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Link href="/category/women">
                    <Typography variant="body1">Women</Typography>
                  </Link>
                </ListItem>
                <ListItem
                  sx={{
                    px: 0,
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Link href="/category/kids">
                    <Typography variant="body1">Kids</Typography>
                  </Link>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography
                variant="h2"
                textTransform={"uppercase"}
                fontSize={14}
                sx={{ color: "#B7B7B7" }}
              >
                CUSTOMER
              </Typography>
              <List dense>
                <ListItem
                  sx={{
                    px: 0,
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Link href="/category/men">
                    <Typography variant="body1">Help and support</Typography>
                  </Link>
                </ListItem>
                <ListItem
                  sx={{
                    px: 0,
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Link href="/category/women">
                    <Typography variant="body1">
                      Shipping and delivery
                    </Typography>
                  </Link>
                </ListItem>
                <ListItem
                  sx={{
                    px: 0,
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Link href="/category/kids">
                    <Typography variant="body1">Payment method</Typography>
                  </Link>
                </ListItem>
                <ListItem
                  sx={{
                    px: 0,
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Link href="/category/kids">
                    <Typography variant="body1">
                      Terms and conditions
                    </Typography>
                  </Link>
                </ListItem>
                <ListItem
                  sx={{
                    px: 0,
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Link href="/category/kids">
                    <Typography variant="body1">Privacy policy</Typography>
                  </Link>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography
                variant="h2"
                textTransform={"uppercase"}
                fontSize={14}
                sx={{ color: "#B7B7B7" }}
              >
                COMPANY
              </Typography>
              <List dense>
                <ListItem
                  sx={{
                    px: 0,
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Link href="/category/men">
                    <Typography variant="body1">About company</Typography>
                  </Link>
                </ListItem>
                <ListItem
                  sx={{
                    px: 0,
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Link href="/category/women">
                    <Typography variant="body1">Our services</Typography>
                  </Link>
                </ListItem>
                <ListItem
                  sx={{
                    px: 0,
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Link href="/category/kids">
                    <Typography variant="body1">Get the voucher</Typography>
                  </Link>
                </ListItem>
                <ListItem
                  sx={{
                    px: 0,
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Link href="/category/kids">
                    <Typography variant="body1">Store locator</Typography>
                  </Link>
                </ListItem>
                <ListItem
                  sx={{
                    px: 0,
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Link href="/category/kids">
                    <Typography variant="body1">Contact us</Typography>
                  </Link>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={2} sx={{display: {xs: 'none', md: 'block'}}}>
              <Typography
                variant="h2"
                textTransform={"uppercase"}
                fontSize={14}
                sx={{ color: "#B7B7B7", mb: 2 }}
              >
                FOLLOW US ON INSTAGRAM
              </Typography>
              <ImageList cols={4} rowHeight={50}>
                {itemData.map((item) => (
                  <ImageListItem key={item.img}>
                    <Image
                      src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                      alt={item.title}
                      width={80}
                      height={80}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%'
                      }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ background: "#9f9f9f1a", width: "100%" }} />
        <Box sx={{ padding: { xs: "20px", md: '20px 0' }, textAlign: {xs: 'center', md: 'left'} }}>
          <Typography variant="body1">
            © 2023 Expression | Designed and coded with ❤ by Heider Gutierrez
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
