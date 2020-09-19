import React from "react";
import styled from "styled-components";
import { FormLabel, Button, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { parse } from "telefone";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ActionGroup = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
`;

const InputGroup = styled.div`
  margin: 1rem 0;
  width: 300px;
  max-width: 100%;
`;

const Contact = ({
  handleNext,
  handleBack,
  contact,
  setContact,
  accountType,
}) => {
  const { register, handleSubmit, errors } = useForm();

  const submitStep = (data) => {
    const { email } = data;
    if (!email) return;

    setContact({
      ...data,
    });
    handleNext();
  };

  const validatePhone = (value) => {
    if (value === "") return true;
    return !!parse(value);
  };

  const getErrorMessageEmail = (error) => {
    switch (error.type) {
      case "required":
        return "O e-mail é obrigatório";
      case "pattern":
        return "O e-mail informado é inválido";
      case "maxLength":
        return "O e-mail informado é longo demais (máx. 155 caractéres)";
      default:
        return "Campo inválido";
    }
  };

  return (
    <Form onSubmit={handleSubmit(submitStep)} noValidate>
      <FormLabel component="legend" style={{ marginBottom: "1.5rem" }}>
        Dados de contato do{" "}
        {accountType === "mediador" ? "mediador" : "usuário"}
      </FormLabel>
      <InputGroup>
        <TextField
          id="email"
          name="email"
          label="E-mail"
          type="email"
          variant="outlined"
          defaultValue={contact.email}
          required
          inputRef={register({
            required: true,
            pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i,
            maxLength: 155,
          })}
          helperText={errors.email && getErrorMessageEmail(errors.email)}
          error={!!errors.email}
          style={{ minWidth: "100%" }}
        />
      </InputGroup>
      <InputGroup>
        <TextField
          id="alternative_email"
          name="alternative_email"
          label="E-mail alternativo"
          type="email"
          variant="outlined"
          defaultValue={contact.alternative_email}
          inputRef={register({
            pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i,
          })}
          helperText={
            errors.alternative_email &&
            "Insira um e-mail válido, ou deixe o campo vazio caso não deseje incluir um e-mail secundário"
          }
          error={!!errors.alternative_email}
          style={{ minWidth: "100%" }}
        />
      </InputGroup>
      <InputGroup>
        <TextField
          id="phone"
          name="phone"
          label="Telefone"
          type="text"
          variant="outlined"
          defaultValue={contact.phone}
          inputRef={register({
            required: false,
            validate: validatePhone,
          })}
          helperText={errors.phone && "Número de telefone inválido"}
          error={!!errors.phone}
          style={{ minWidth: "100%" }}
        />
      </InputGroup>

      <InputGroup>
        <TextField
          id="cellphone"
          name="cellphone"
          label="Celular"
          type="text"
          variant="outlined"
          defaultValue={contact.cellphone}
          inputRef={register({
            required: false,
            validate: validatePhone,
          })}
          helperText={errors.cellphone && "Número de celular inválido"}
          error={!!errors.cellphone}
          style={{ minWidth: "100%" }}
        />
      </InputGroup>

      <ActionGroup>
        <Button onClick={handleBack}>Voltar</Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginLeft: "1.5rem" }}
        >
          Próximo
        </Button>
      </ActionGroup>
    </Form>
  );
};

export default Contact;
