import React from "react";
import styled from "styled-components";
import colors from "../../constants/colors";
import Spinner from "./utils/Spinner";

const Form = styled.form`
  flex: 1;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

const Label = styled.label`
  margin-bottom: 10px;
  color: ${colors.light.text};
`;

const Input = styled.input`
  height: 36px;
  border: 1px solid ${colors.light.textSecondary};
  border-radius: 5px;

  padding: 0 10px;
  font-size: inherit;
  color: ${colors.light.text};
`;

const ForgotPassword = styled.a`
  color: ${colors.light.link};
  cursor: pointer;
  padding: 10px 0;
  text-align: right;
  font-size: 0.9em;
`;

const ActionGroup = styled(InputGroup)``;

const Button = styled.button`
  cursor: pointer;
  border: none;
  background-color: ${colors.light.button};
  color: #fff;
  font-weight: bold;

  height: 36px;
  border-radius: 5px;
  transition: background-color 0.2s linear;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${colors.light.buttonSecondary};
  }
`;

const LoginForm = ({ handleLogin, loading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Label>E-mail</Label>
        <Input type="email" />
      </InputGroup>
      <InputGroup>
        <Label>Senha</Label>
        <Input type="password" />
        <ForgotPassword>Esqueceu a senha?</ForgotPassword>
      </InputGroup>
      <ActionGroup>
        {loading ? (
          <Button disabled>
            <Spinner />
            <span style={{ marginLeft: 5 }}>processando</span>
          </Button>
        ) : (
          <Button type="submit">ENTRAR</Button>
        )}
      </ActionGroup>
    </Form>
  );
};

export default LoginForm;
