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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <TextField id="email" label="E-mail" variant="outlined" />
      </InputGroup>
      <InputGroup>
        <TextField
          id="password"
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
