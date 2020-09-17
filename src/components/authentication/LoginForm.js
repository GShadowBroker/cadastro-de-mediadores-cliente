import React, { useState } from "react";
import styled from "styled-components";
import colors from "../../constants/colors";
import Spinner from "../utils/Spinner";
import { Link } from "react-router-dom";
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useForm } from "react-hook-form";

const Form = styled.form`
  flex: 1;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

const ForgotPassword = styled.div`
  color: ${colors.light.link};
  padding: 10px 0;
  text-align: right;
  font-size: 0.9em;

  a {
  }
`;

const ActionGroup = styled(InputGroup)``;

const LoginForm = ({ handleLogin, loading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, errors, handleSubmit } = useForm();

  const handleLoginSubmit = (data) => {
    console.log("data", data);
    handleLogin();
  };

  const getErrorMessagePassword = (error) => {
    switch (error.type) {
      case "required":
        return "Digite a sua senha";
      case "maxLength":
        return "A senha deve ter no máximo 55 caractéres";
      case "minLength":
        return "A senha deve ter no mínimo 5 caractéres";
      default:
        return "Campo inválido";
    }
  };
  const getErrorMessageEmail = (error) => {
    switch (error.type) {
      case "required":
        return "Digite o seu e-mail";
      case "pattern":
        return "Digite um e-mail válido";
      default:
        return "Campo inválido";
    }
  };

  return (
    <Form onSubmit={handleSubmit(handleLoginSubmit)}>
      <InputGroup>
        <TextField
          id="email"
          name="email"
          label="E-mail"
          variant="outlined"
          size="small"
          inputRef={register({
            required: true,
            pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i,
          })}
          helperText={errors.email && getErrorMessageEmail(errors.email)}
          error={!!errors.email}
        />
      </InputGroup>
      <InputGroup>
        <TextField
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          label="Senha"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          size="small"
          inputRef={register({ required: true, maxLength: 55, minLength: 5 })}
          helperText={
            errors.password && getErrorMessagePassword(errors.password)
          }
          error={!!errors.password}
        />
        <ForgotPassword>
          <Link to="/recuperar_senha">Esqueceu a senha?</Link>
        </ForgotPassword>
      </InputGroup>
      <ActionGroup>
        {loading ? (
          <Button variant="contained" color="primary" disabled>
            <Spinner />
            <span style={{ marginLeft: 5 }}>processando</span>
          </Button>
        ) : (
          <Button type="submit" variant="contained" color="primary">
            ENTRAR
          </Button>
        )}
      </ActionGroup>
    </Form>
  );
};

export default LoginForm;
