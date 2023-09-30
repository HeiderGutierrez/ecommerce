import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext, UiContext } from "@/context";
import { useRouter } from "next/router";
import Search from '../../public/icons/search.svg';
import User from '../../public/icons/user.svg';
import Ticket from '../../public/icons/ticket.svg';
import LogOut from '../../public/icons/log-out.svg';
import LogIn from '../../public/icons/log-in.svg';
import LayoutDashboard from '../../public/icons/layout-dashboard.svg';
import Users from '../../public/icons/users.svg';
import Shirt from '../../public/icons/shirt.svg';
import Image from 'next/image';

export const SideMenu = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const { isMenuOpen, closeSideMenu } = useContext(UiContext);
  const [searchProduct, setSearchProduct] = useState("");
  const router = useRouter();
  const onSearchProduct = () => {
    if (searchProduct.trim().length === 0) return;
    navigateTo(`/search/${searchProduct}`);
  };
  const navigateTo = (url: string) => {
    closeSideMenu();
    router.push(url);
  };

  return (
    <Drawer
      open={isMenuOpen}
      onClose={closeSideMenu}
      anchor="right"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              type="text"
              autoFocus
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={onSearchProduct}
                  >
                    <Image src={Search} alt="" />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>
          {isLoggedIn && (
            <>
              <ListItem button>
                <ListItemIcon>
                  <Image src={User} alt="" />
                </ListItemIcon>
                <ListItemText primary={"Perfil"} />
              </ListItem>

              <ListItem button onClick={() => navigateTo('/orders/history')}>
                <ListItemIcon>
                  <Image src={Ticket} alt="" />
                </ListItemIcon>
                <ListItemText primary={"Mis Ordenes"} />
              </ListItem>
            </>
          )}

          <ListItem
            button
            sx={{ display: { xs: "", sm: "none" } }}
            onClick={() => navigateTo("/category/men")}
          >
            <ListItemIcon>
              <Image src={Ticket} alt="" />
            </ListItemIcon>
            <ListItemText primary={"Hombres"} />
          </ListItem>

          <ListItem
            button
            sx={{ display: { xs: "", sm: "none" } }}
            onClick={() => navigateTo("/category/women")}
          >
            <ListItemIcon>
              <Image src={Ticket} alt="" />
            </ListItemIcon>
            <ListItemText primary={"Mujeres"} />
          </ListItem>

          <ListItem
            button
            sx={{ display: { xs: "", sm: "none" } }}
            onClick={() => navigateTo("/category/kids")}
          >
            <ListItemIcon>
              <Image src={Ticket} alt="" />
            </ListItemIcon>
            <ListItemText primary={"Niños"} />
          </ListItem>
          {!isLoggedIn ? (
            <ListItem button onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}>
              <ListItemIcon>
                <Image src={LogIn} alt="" />
              </ListItemIcon>
              <ListItemText primary={"Ingresar"} />
            </ListItem>
          ) : (
            <ListItem button onClick={() => logout()}>
              <ListItemIcon>
                <Image src={LogOut} alt="" />
              </ListItemIcon>
              <ListItemText primary={"Salir"} />
            </ListItem>
          )}

          {/* Admin */}
          {user?.role === "admin" && (
            <>
              <Divider />
              <ListSubheader>Admin Panel</ListSubheader>

              <ListItem button onClick={() => navigateTo(`/admin/`)}>
                <ListItemIcon>
                  <Image src={LayoutDashboard} alt="" />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} />
              </ListItem>
              <ListItem button onClick={() => navigateTo(`/admin/products`)}>
                <ListItemIcon>
                  <Image src={Shirt} alt="" />
                </ListItemIcon>
                <ListItemText primary={"Productos"} />
              </ListItem>
              <ListItem button onClick={() => navigateTo(`/admin/orders`)}>
                <ListItemIcon>
                  <Image src={Ticket} alt="" />
                </ListItemIcon>
                <ListItemText primary={"Ordenes"} />
              </ListItem>

              <ListItem button onClick={() => navigateTo(`/admin/users`)}>
                <ListItemIcon>
                  <Image src={Users} alt="" />
                </ListItemIcon>
                <ListItemText primary={"Usuarios"} />
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );
};
