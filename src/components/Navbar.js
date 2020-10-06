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
import AccountCircle from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
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

const Navbar = ({ handleLogout }) => {
  const history = useHistory();
  const classes = useStyles();
  const session = useSelector((state) => state.authReducer);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (url) => {
    handleClose();
    history.push(url);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="secondary"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          CNN
        </Typography>

        {session.isAuthenticated ? (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
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
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleMenuClick("/perfil")}>
                <AccountCircle />
                <Typography style={{ marginLeft: ".5rem" }}>Perfil</Typography>
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
    </AppBar>
  );
};

export default Navbar;
