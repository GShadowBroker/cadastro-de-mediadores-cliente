import React, { useEffect, useState } from "react";
import { getMediator } from "../services/mediatorsService";
import { useParams } from "react-router-dom";
import errorHandler from "../utils/errorHandler";
import Snackbar from "../components/utils/Snackbar";
import { useSelector } from "react-redux";
import {
  Container,
  Paper,
  Grid,
  Typography,
  Fade,
  Button,
  Divider,
} from "@material-ui/core";
import styled from "styled-components";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";
import PhoneAndroidOutlinedIcon from "@material-ui/icons/PhoneAndroidOutlined";
import AttachmentIcon from "@material-ui/icons/Attachment";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import PublicProfileMediatorSkeleton from "../components/skeletons/PublicProfileMediatorSkeleton";

import { Rating } from "@material-ui/lab";
import colors from "../constants/colors";
import { getAttachment } from "../services/mediatorsService";

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

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const ButtonsContainer = styled.div`
  padding: 1rem;
`;

const PublicProfileMediator = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const { id } = useParams();
  const session = useSelector((state) => state.authReducer);

  useEffect(() => {
    setLoading(true);
    if (session.isAuthenticated && session.user.id === id) {
      setUser(session.user);
      setLoading(false);
      return;
    } else if (id) {
      getMediator(id)
        .then((data) => {
          setLoading(false);
          setUser(data);
        })
        .catch((err) => {
          setLoading(false);
          setErrorMessage(errorHandler(err));
          setSnackOpen(true);
        });
    }
  }, [id, session]);

  if (loading) return <PublicProfileMediatorSkeleton />;
  if (!user)
    return (
      <h1>Erro de conexão com o servidor. Por favor, tente mais tarde.</h1>
    );

  const handleClickLink = () => {
    const confirm = window.confirm(
      `Você está tentando acessar o link externo '${user.lattes}'. Deseja continuar?`
    );
    if (!confirm) return;
    if (
      user.lattes.startsWith("http://") ||
      user.lattes.startsWith("https://")
    ) {
      window.open(user.lattes);
      return;
    } else {
      window.open(`http://${user.lattes}`);
    }
  };

  const handleAttachment = () => {
    getAttachment(user.id);
  };

  return (
    <Fade in={true}>
      <React.Fragment>
        <Container maxWidth="md" style={{ minHeight: "73vh" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={3}>
              <SPaper>
                <Header height={12}>
                  <AccountCircleIcon
                    color="primary"
                    fontSize="large"
                    style={{ marginBottom: ".5rem" }}
                  />
                  <Typography
                    variant="body1"
                    color="primary"
                    align="center"
                    style={{ wordWrap: "break-word" }}
                  >
                    {user.fullname}
                  </Typography>
                  <Typography variant="caption" color="secondary">
                    {user.sex === "feminino" ? "Mediadora" : "Mediador"}
                  </Typography>
                  <Rating
                    name="half-rating"
                    value={5}
                    precision={0.5}
                    readOnly
                    style={{ marginTop: ".5rem" }}
                  />
                  <Typography variant="caption" color="secondary">
                    ({Math.ceil(Math.random() * 10)} avaliações)
                  </Typography>
                </Header>
                <Divider />
                <ContactContainer>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "1rem",
                      alignItems: "center",
                    }}
                  >
                    <EmailOutlinedIcon fontSize="small" color="secondary" />
                    <Typography
                      variant="caption"
                      style={{
                        wordWrap: "break-word",
                        marginLeft: ".5rem",
                        maxWidth: "85%",
                      }}
                      color="secondary"
                    >
                      {user.email}
                    </Typography>
                  </div>
                  {user.phone && (
                    <Typography
                      variant="caption"
                      style={{
                        marginTop: "1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                      color="secondary"
                    >
                      <PhoneOutlinedIcon fontSize="small" />
                      <Typography
                        variant="caption"
                        style={{ wordWrap: "break-word", marginLeft: ".5rem" }}
                      >
                        {user.phone}
                      </Typography>
                    </Typography>
                  )}
                  {user.cellphone && (
                    <Typography
                      variant="caption"
                      style={{
                        marginTop: "1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                      color="secondary"
                    >
                      <PhoneAndroidOutlinedIcon fontSize="small" />
                      <Typography
                        variant="caption"
                        style={{ wordWrap: "break-word", marginLeft: ".5rem" }}
                      >
                        {user.cellphone}
                      </Typography>
                    </Typography>
                  )}
                </ContactContainer>
                <Divider />
                <ButtonsContainer>
                  {user.lattes && (
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      style={{
                        marginTop: "1rem",
                        color: colors.light.primary.main,
                      }}
                      fullWidth
                      startIcon={<DescriptionOutlinedIcon />}
                      onClick={handleClickLink}
                    >
                      ver lattes
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    style={{
                      marginTop: "1rem",
                      color: colors.light.primary.main,
                    }}
                    fullWidth
                    startIcon={<AttachmentIcon />}
                    onClick={handleAttachment}
                  >
                    ver anexo
                  </Button>
                </ButtonsContainer>
              </SPaper>
            </Grid>

            <Grid item xs={12} sm={8} md={9}>
              <SPaper style={{ padding: "1rem" }}>
                <Grid
                  container
                  style={{ marginTop: "1rem", marginBottom: "2rem" }}
                >
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="primary">
                      Cidades de atuação:
                    </Typography>
                    <Typography variant="body2" style={{ marginLeft: "1rem" }}>
                      {user.actuation_cities.join(", ")}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="primary">
                      Unidades de atuação:
                    </Typography>
                    <Typography variant="body2" style={{ marginLeft: "1rem" }}>
                      {user.actuation_units.join(", ")}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container style={{ marginBottom: "2rem" }}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="primary">
                      Certificação:
                    </Typography>
                    <Typography variant="body2" style={{ marginLeft: "1rem" }}>
                      {user.certification}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="primary">
                      Valor médio:
                    </Typography>
                    <Typography variant="body2" style={{ marginLeft: "1rem" }}>
                      {user.average_value}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container style={{ marginBottom: "2rem" }}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Especialização:
                    </Typography>
                    <Typography variant="body2" style={{ marginLeft: "1rem" }}>
                      {user.specialization.join(", ")}
                    </Typography>
                  </Grid>
                </Grid>
                {user.resume && (
                  <Grid container style={{ marginBottom: "2rem" }}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="primary">
                        Mini-currículo:
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{ marginLeft: "1rem" }}
                      >
                        {user.resume}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              </SPaper>
            </Grid>
          </Grid>
        </Container>
        <Snackbar
          message={errorMessage}
          severity="error"
          autoHideDuration={6000}
          snackOpen={snackOpen}
          setSnackOpen={setSnackOpen}
        />
      </React.Fragment>
    </Fade>
  );
};

export default PublicProfileMediator;
