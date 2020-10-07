import React from "react";
import { Button, Typography, Drawer } from "@material-ui/core";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import colors from "../constants/colors";

const DrawerHeader = styled.div`
  height: ${(props) => props.height}rem;
  width: 100%;
  min-width: 220px;
  max-width: 260px;
  margin: 1rem 0;
  padding: 0.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DrawerContent = ({ user, handleLogout, toggleDrawer }) => {
  const location = useLocation();

  if (user) {
    const isCamara = !!user.cnpj;

    const getAccountType = (user) => {
      if (isCamara) {
        return "Câmara privada";
      } else {
        return user.sex === "feminino" ? "Mediadora" : "Mediador";
      }
    };

    return (
      <React.Fragment>
        <DrawerHeader height={8}>
          <AccountCircleIcon
            color="primary"
            fontSize="large"
            style={{ marginBottom: ".5rem" }}
          />
          <Typography
            variant="body1"
            color="primary"
            component={Link}
            to={`/perfil/publico/${isCamara ? "camara" : "mediador"}/${
              user.id
            }`}
            onClick={toggleDrawer}
            align="center"
            style={{ cursor: "pointer", color: colors.light.primary.main }}
          >
            {isCamara ? user.nome_fantasia : user.fullname}
          </Typography>
          <Typography variant="caption" color="secondary">
            {getAccountType(user)}
          </Typography>
        </DrawerHeader>
        <List>
          <Divider />
          <ListItem
            button
            selected={location.pathname === "/"}
            component={Link}
            to={`/`}
            onClick={toggleDrawer}
            style={{
              color: colors.light.secondary.main,
            }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>
          <ListItem
            button
            selected={location.pathname === "/perfil"}
            component={Link}
            to={`/perfil`}
            onClick={toggleDrawer}
            style={{
              color: colors.light.secondary.main,
            }}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>Perfil</ListItemText>
          </ListItem>
          <ListItem
            button
            selected={location.pathname.startsWith("/perfil/notificacoes")}
            component={Link}
            to={`/perfil/notificacoes`}
            onClick={toggleDrawer}
            style={{
              color: colors.light.secondary.main,
            }}
          >
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText>Notificações</ListItemText>
          </ListItem>
          <ListItem
            button
            selected={location.pathname.startsWith("/perfil/configuracoes")}
            component={Link}
            to={`/perfil/configuracoes`}
            onClick={toggleDrawer}
            style={{
              color: colors.light.secondary.main,
            }}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText>Configurações</ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={() => {
              handleLogout();
              toggleDrawer();
            }}
            style={{
              color: colors.light.secondary.main,
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText>Sair</ListItemText>
          </ListItem>
          <Divider />
        </List>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <DrawerHeader height={6}>
          <AccountCircleIcon color="primary" fontSize="large" />
          <Button
            variant="outlined"
            color="primary"
            onClick={toggleDrawer}
            component={Link}
            to={`/login`}
            style={{ marginTop: ".5rem", color: colors.light.primary.main }}
          >
            Faça o login
          </Button>
        </DrawerHeader>
        <List>
          <Divider />
          <ListItem
            button
            onClick={toggleDrawer}
            component={Link}
            to={`/`}
            style={{ color: colors.light.secondary.main }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={toggleDrawer}
            component={Link}
            to={`/login`}
            style={{ color: colors.light.secondary.main }}
          >
            <ListItemIcon>
              <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText>Entrar</ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={toggleDrawer}
            component={Link}
            to={`/registro`}
            style={{ color: colors.light.secondary.main }}
          >
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText>Cadastrar</ListItemText>
          </ListItem>
          <Divider />
        </List>
      </React.Fragment>
    );
  }
};

const DrawerMenu = ({ handleLogout, drawerOpen, toggleDrawer }) => {
  const session = useSelector((state) => state.authReducer);
  return (
    <React.Fragment>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <DrawerContent
          user={session ? session.user : null}
          handleLogout={handleLogout}
          toggleDrawer={toggleDrawer}
        />
      </Drawer>
    </React.Fragment>
  );
};

DrawerMenu.defaultProps = {
  drawerOpen: false,
  toggleDrawer: () => {
    console.log("Nenhuma função passada para o componente");
  },
};

export default DrawerMenu;
