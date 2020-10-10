import React from "react";
import {
  Container,
  Grid,
  Paper,
  Fade,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { AccountCircle } from "@material-ui/icons";
import { useLocation, Link, Route, Switch } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AttachmentIcon from "@material-ui/icons/Attachment";
import SettingsIcon from "@material-ui/icons/Settings";
import colors from "../../constants/colors";

import ProfileMain from "./ProfileMain";
import ProfileDoc from "./ProfileDoc";
import ProfileNotifications from "./ProfileNotifications";
import ProfileConfig from "./ProfileConfig";
import CamaraMain from "./CamaraMain";
import CamaraDoc from "./CamaraDoc";
import CamaraNotifications from "./CamaraNotifications";
import CamaraConfig from "./CamaraConfig";

const SPaper = styled(Paper)`
  padding: 1rem 0;
`;

const Header = styled.div`
  height: ${(props) => props.height}rem;
  width: 100%;
  margin: 1rem 0;
  padding: 0.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Profile = () => {
  const loggedUser = useSelector((state) => state.authReducer.user);
  const isCamara = !!loggedUser.cnpj;
  const location = useLocation();

  const getAccountType = (user) => {
    if (isCamara) {
      return "Câmara privada";
    } else {
      return user.sex === "feminino" ? "Mediadora" : "Mediador";
    }
  };

  return (
    <Fade in={true}>
      <Container maxWidth="md" style={{ minHeight: "73vh" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={3}>
            <SPaper>
              <Header height={11}>
                <AccountCircle
                  color="primary"
                  fontSize="large"
                  style={{ marginBottom: ".5rem" }}
                />
                <Typography variant="body1" color="primary" align="center">
                  {isCamara ? loggedUser.nome_fantasia : loggedUser.fullname}
                </Typography>
                <Typography variant="caption" color="secondary">
                  {getAccountType(loggedUser)}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  component={Link}
                  to={`/perfil/publico/${isCamara ? "camara" : "mediador"}/${
                    loggedUser.id
                  }`}
                  style={{
                    marginTop: "1rem",
                    color: colors.light.primary.main,
                  }}
                >
                  ver perfil público
                </Button>
              </Header>
              <List>
                <Divider />
                <ListItem
                  button
                  selected={location.pathname === "/"}
                  component={Link}
                  to={`/`}
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
                  style={{
                    color: colors.light.secondary.main,
                  }}
                >
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText>Minha conta</ListItemText>
                </ListItem>
                <ListItem
                  button
                  selected={location.pathname.startsWith("/perfil/documentos")}
                  component={Link}
                  to={`/perfil/documentos`}
                  style={{
                    color: colors.light.secondary.main,
                  }}
                >
                  <ListItemIcon>
                    <AttachmentIcon />
                  </ListItemIcon>
                  <ListItemText>Documentos</ListItemText>
                </ListItem>
                <ListItem
                  button
                  selected={location.pathname.startsWith(
                    "/perfil/notificacoes"
                  )}
                  component={Link}
                  to={`/perfil/notificacoes`}
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
                  selected={location.pathname.startsWith(
                    "/perfil/configuracoes"
                  )}
                  component={Link}
                  to={`/perfil/configuracoes`}
                  style={{
                    color: colors.light.secondary.main,
                  }}
                >
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText>Configurações</ListItemText>
                </ListItem>
              </List>
            </SPaper>
          </Grid>

          <Grid item xs={12} sm={8} md={9}>
            <SPaper>
              {isCamara ? (
                <Switch>
                  <Route path="/perfil/configuracoes">
                    <CamaraConfig user={loggedUser} />
                  </Route>
                  <Route path="/perfil/notificacoes">
                    <CamaraNotifications user={loggedUser} />
                  </Route>
                  <Route path="/perfil/documentos">
                    <CamaraDoc user={loggedUser} />
                  </Route>
                  <Route path="/perfil">
                    <CamaraMain user={loggedUser} />
                  </Route>
                </Switch>
              ) : (
                <Switch>
                  <Route path="/perfil/configuracoes">
                    <ProfileConfig user={loggedUser} />
                  </Route>
                  <Route path="/perfil/notificacoes">
                    <ProfileNotifications user={loggedUser} />
                  </Route>
                  <Route path="/perfil/documentos">
                    <ProfileDoc user={loggedUser} />
                  </Route>
                  <Route path="/perfil">
                    <ProfileMain user={loggedUser} />
                  </Route>
                </Switch>
              )}
            </SPaper>
          </Grid>
        </Grid>
      </Container>
    </Fade>
  );
};

export default Profile;
