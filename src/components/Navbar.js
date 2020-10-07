import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Container } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Badge from "@material-ui/core/Badge";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import NotificationsIcon from "@material-ui/icons/Notifications";
import colors from "../constants/colors";

import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = ({ handleLogout, toggleDrawer }) => {
  const history = useHistory();
  const classes = useStyles();
  const session = useSelector((state) => state.authReducer);
  // Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  // Notifications
  const [anchorNotif, setAnchorNotif] = useState(null);
  const notificationsOpen = Boolean(anchorNotif);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNotifications = (event) => {
    setAnchorNotif(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleNotifClose = () => {
    setAnchorNotif(null);
  };

  const handleMenuClick = (url) => {
    handleClose();
    history.push(url);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="secondary.main"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}
            color="secondary.main"
          >
            Logo
          </Typography>

          {session.isAuthenticated ? (
            <div>
              <IconButton
                aria-label="notificações do usuário atual"
                aria-controls="menu-appbar-notifications"
                aria-haspopup="true"
                onClick={handleNotifications}
                color="secondary.main"
              >
                <Badge badgeContent={1} color="primary" variant="dot">
                  <NotificationsNoneIcon />
                </Badge>
              </IconButton>
              <Menu
                id="menu-appbar-notifications"
                anchorEl={anchorNotif}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={notificationsOpen}
                onClose={handleNotifClose}
              >
                <MenuItem>Nenhuma notificação</MenuItem>
              </Menu>

              <IconButton
                aria-label="conta do usuário atual"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="secondary.main"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={menuOpen}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleMenuClick("/perfil")}>
                  <AccountCircle />
                  <Typography style={{ marginLeft: ".5rem" }}>
                    Perfil
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => handleMenuClick("/perfil/configuracoes")}
                >
                  <SettingsIcon />
                  <Typography style={{ marginLeft: ".5rem" }}>
                    Configurações
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleLogout();
                    handleClose();
                  }}
                >
                  <ExitToAppIcon />
                  <Typography style={{ marginLeft: ".5rem" }}>Sair</Typography>
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Button
              color="primary"
              component={Link}
              to="/login"
              style={{ color: colors.light.primary.main }}
            >
              Entrar
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
