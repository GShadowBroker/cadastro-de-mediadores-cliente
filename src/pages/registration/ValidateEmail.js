import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { validateEmail } from "../../services/authService";
import errorHandler from "../../utils/errorHandler";
import { Container, Fade, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const ValidateEmail = () => {
  const { account_type, user_id, verification_code } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let timerID = null;
    if (account_type && user_id && verification_code) {
      validateEmail(user_id, account_type, verification_code)
        .then((response) => {
          if (response.account_status === "regular") {
            setValidated(true);
            timerID = setTimeout(() => {
              history.push("/perfil");
            }, 5000);
          }
        })
        .catch((err) => {
          setErrorMessage(errorHandler(err));
        });
    }
    return (timerID) => clearTimeout(timerID);
  }, []);

  return (
    <Fade in={true}>
      <Container maxWidth="md" style={{ margin: "2rem auto" }}>
        <Paper style={{ marginBottom: "1rem", padding: "1rem" }}>
          <Typography
            variant="h5"
            style={{
              marginBottom: "1rem",
            }}
          >
            Validação concluída
          </Typography>
          <Typography className={classes.instructions}>
            {validated && !errorMessage
              ? "O seu e-mail foi validado com sucesso! Redirecionando em 5 segundos..."
              : errorMessage || "Validando..."}
          </Typography>
        </Paper>
      </Container>
    </Fade>
  );
};

export default ValidateEmail;
