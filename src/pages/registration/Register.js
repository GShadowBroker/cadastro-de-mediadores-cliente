import React, { useState, useEffect } from "react";
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
  Fade,
} from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useSelector } from "react-redux";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Professional from "./Professional";
import Contact from "./Contact";
import Finish from "./Finish";
import Footer from "../../components/Footer";

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
    ? [
        "Tipo de conta",
        "Dados pessoais",
        "Dados profissionais",
        "Contato",
        "Finalizar",
      ]
    : ["Tipo de conta", "Dados pessoais", "Contato", "Finalizar"];
};

const Register = () => {
  const accountType = useSelector(
    (state) => state.registrationReducer.accountType
  );

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [stepperOrientation, setStepperOrientation] = useState("horizontal");

  useEffect(() => {
    if (window.innerWidth < 500) {
      setStepperOrientation("vertical");
    }
  }, []);

  const steps = getSteps(accountType);

  const getStepContent = (step) => {
    if (steps.length > 4) {
      switch (step) {
        case 0:
          return <Step1 handleBack={handleBack} handleNext={handleNext} />;
        case 1:
          return <Step2 handleNext={handleNext} handleBack={handleBack} />;
        case 2:
          return (
            <Professional handleNext={handleNext} handleBack={handleBack} />
          );
        case 3:
          return <Contact handleNext={handleNext} handleBack={handleBack} />;
        case 4:
          return <Finish handleNext={handleNext} handleBack={handleBack} />;
        default:
          return "Unknown step";
      }
    } else {
      switch (step) {
        case 0:
          return <Step1 handleBack={handleBack} handleNext={handleNext} />;
        case 1:
          return <Step2 handleNext={handleNext} handleBack={handleBack} />;
        case 2:
          return <Contact handleNext={handleNext} handleBack={handleBack} />;
        case 3:
          return <Finish handleNext={handleNext} handleBack={handleBack} />;
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
    <Fade in={true}>
      <Container maxWidth="md" style={{ margin: "2rem auto" }}>
        <Paper style={{ marginBottom: "1rem" }}>
          <Stepper
            activeStep={activeStep}
            orientation={stepperOrientation}
            alternativeLabel={stepperOrientation === "horizontal"}
          >
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
              <Fade in={true}>
                <div>
                  <Typography
                    variant="h5"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <MailOutlineIcon />{" "}
                    <span style={{ marginLeft: 5 }}>Confirme sua conta</span>
                  </Typography>
                  <Typography className={classes.instructions}>
                    Enviamos um e-mail de confirmação para você. Na mensagem,
                    clique no link para validar a sua conta. Se não encontrar o
                    e-mail, verifique sua caixa de spam/lixo eletrônico.
                  </Typography>
                </div>
              </Fade>
            ) : (
              <div>
                <div className={classes.instructions}>
                  {getStepContent(activeStep)}
                </div>
              </div>
            )}
          </FormContainer>
        </Paper>
        <Footer />
      </Container>
    </Fade>
  );
};

export default Register;
