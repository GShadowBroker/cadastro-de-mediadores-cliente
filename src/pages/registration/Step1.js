import React from "react";
import styled from "styled-components";
import {
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Button,
} from "@material-ui/core";

const LabelControl = styled(FormControlLabel)`
  margin: 0.6rem 0;
  padding: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  display: flex;
  justify-content: left;

  &:not(:last-of-type) {
    margin-top: 35px;
  }
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

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

const Step1 = ({ accountType, setAccountType, handleNext }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!accountType) return;
    handleNext();
  };
  return (
    <Form onSubmit={handleSubmit}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Como deseja se cadastrar?</FormLabel>
        <RadioGroup
          aria-label="tipo_de_cadastro"
          name="cadastro"
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
        >
          <LabelControl
            value="usuario"
            control={<Radio color="primary" />}
            label="Usuário"
          />
          <LabelControl
            value="mediador"
            control={<Radio color="primary" />}
            label="Mediador"
          />
        </RadioGroup>
      </FormControl>
      <ActionGroup>
        <Button disabled>Voltar</Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
          style={{ marginLeft: "1.5rem" }}
        >
          Próximo
        </Button>
      </ActionGroup>
    </Form>
  );
};

export default Step1;
