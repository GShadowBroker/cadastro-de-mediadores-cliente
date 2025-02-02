import React from "react";
import styled from "styled-components";
import {
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Button,
  Fade,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { submitAccountType } from "../../store/registrationReducer";

const LabelControl = styled(FormControlLabel)`
  margin: 0.6rem 0;
  padding: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  display: flex;
  justify-content: left;

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

const AccountType = ({ handleNext }) => {
  const dispatch = useDispatch();
  const accountType = useSelector(
    (state) => state.registrationReducer.accountType
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!accountType) return;
    dispatch(submitAccountType(accountType));
    handleNext();
  };
  return (
    <Fade in={true}>
      <Form onSubmit={handleSubmit}>
        <FormControl component="fieldset">
          <FormLabel component="legend" style={{ marginBottom: "1.5rem" }}>
            Como deseja se cadastrar?
          </FormLabel>
          <RadioGroup
            aria-label="tipo_de_cadastro"
            name="cadastro"
            value={accountType}
            onChange={(e) => dispatch(submitAccountType(e.target.value))}
            style={{ minWidth: "100%" }}
          >
            <LabelControl
              value="mediador"
              control={<Radio color="primary" />}
              label="Mediador"
            />
            <LabelControl
              value="camara"
              control={<Radio color="primary" />}
              label="Câmara privada"
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
    </Fade>
  );
};

export default AccountType;
