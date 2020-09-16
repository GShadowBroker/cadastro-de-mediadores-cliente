import React, { useState } from "react";
import styled from "styled-components";

import { makeStyles } from "@material-ui/core/styles";
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Container,
  Card,
  Paper,
} from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

import Step1 from "./Step1";
import Step2 from "./Step2";

const FormContainer = styled(Card)`
  padding: 25px;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 1000,
    height: 500,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const getSteps = (type) => {
  return type === "mediador"
    ? ["Tipo de conta", "Dados pessoais", "Dados profissionais", "Contato"]
    : ["Tipo de conta", "Dados pessoais", "Contato"];
};

const Register = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  // Form data
  const [accountType, setAccountType] = useState("usuario");

  const [personal, setPersonal] = useState({
    cpf: "",
    name: "",
    sex: "selecione",
    birthday: "2000-01-01",
  });

  const steps = getSteps(accountType);

  const getStepContent = (step) => {
    if (steps.length > 3) {
      switch (step) {
        case 0:
          return (
            <Step1
              accountType={accountType}
              setAccountType={setAccountType}
              handleBack={handleBack}
              handleNext={handleNext}
            />
          );
        case 1:
          return (
            <Step2
              handleNext={handleNext}
              handleBack={handleBack}
              personal={personal}
              setPersonal={setPersonal}
            />
          );
        case 2:
          return <Typography variant="h5">Profissional</Typography>;
        case 3:
          return <Typography variant="h5">Contato</Typography>;
        default:
          return "Unknown step";
      }
    } else {
      switch (step) {
        case 0:
          return (
            <Step1
              accountType={accountType}
              setAccountType={setAccountType}
              handleBack={handleBack}
              handleNext={handleNext}
            />
          );
        case 1:
          return (
            <Step2
              handleNext={handleNext}
              handleBack={handleBack}
              personal={personal}
              setPersonal={setPersonal}
            />
          );
        case 2:
          return <Typography variant="h5">Contato</Typography>;
        default:
          return "Unknown step";
      }
    }
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Container maxWidth="md" style={{ margin: "2rem auto" }}>
      <Paper>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <FormContainer>
          {activeStep === steps.length ? (
            <div>
              <Typography
                variant="h5"
                style={{ display: "flex", alignItems: "center" }}
              >
                <MailOutlineIcon />{" "}
                <span style={{ marginLeft: 5 }}>Confirme sua conta</span>
              </Typography>
              <Typography className={classes.instructions}>
                Enviamos um e-mail de confirmação para você. No corpo da
                mensagem, clique no link enviado para validar a sua conta. Se
                não encontrar o e-mail, verifique sua caixa de spam/lixo
                eletrônico.
              </Typography>
              {/* <Button onClick={handleReset} className={classes.button}>
                Resetar
              </Button> */}
            </div>
          ) : (
            <div>
              <div className={classes.instructions}>
                {getStepContent(activeStep)}
              </div>
              {/* <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Voltar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? "Concluir" : "Próximo"}
                </Button>
              </div> */}
            </div>
          )}
        </FormContainer>
      </Paper>
    </Container>
  );
};

export default Register;
