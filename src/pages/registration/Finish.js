import React, { useState } from "react";
import styled from "styled-components";
import {
  FormLabel,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Fade,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { submitConfirm } from "../../store/registrationReducer";

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

const Finish = ({ handleNext, handleBack }) => {
  const dispatch = useDispatch();
  const confirm = useSelector((state) => state.registrationReducer.confirm);

  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, errors, watch } = useForm();

  const watchAccept = watch("acceptTerms");

  const submitStep = (data) => {
    const { password, acceptTerms } = data;
    if (!password || !acceptTerms) return;
    const confirmInfo = {
      ...data,
    };
    dispatch(submitConfirm(confirmInfo));
    handleNext(); // SAVE TO DATABASE FIRST!!!
  };

  const validatePassword = (value) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value);
  };

  const getErrorMessagePassword = (error) => {
    switch (error.type) {
      case "required":
        return "Digite a sua senha";
      case "maxLength":
        return "A senha deve ter no máximo 55 caractéres";
      case "minLength":
        return "A senha deve ter no mínimo 6 caractéres";
      case "validate":
        return "A sua senha deve conter letras e números";
      default:
        return "Campo inválido";
    }
  };

  return (
    <Fade in={true}>
      <Form onSubmit={handleSubmit(submitStep)} noValidate>
        <FormLabel component="legend" style={{ marginBottom: "1.5rem" }}>
          Finalizando o cadastro
        </FormLabel>
        <InputGroup>
          <input
            type="text"
            id="username"
            name="username"
            autoComplete="username"
            defaultValue="a_b"
            style={{ display: "none" }}
          />
          <TextField
            id="password"
            name="password"
            autoComplete="new-password"
            label="Senha"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            defaultValue={confirm.password}
            required
            inputRef={register({
              required: true,
              maxLength: 55,
              minLength: 6,
              validate: validatePassword,
            })}
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
            helperText={
              errors.password && getErrorMessagePassword(errors.password)
            }
            error={!!errors.password}
            style={{ minWidth: "100%" }}
          />
        </InputGroup>
        <InputGroup>
          <FormControlLabel
            control={<Checkbox name="acceptTerms" color="primary" required />}
            label="Li e aceito os Termos e Condições e as Políticas de Privacidade."
            inputRef={register}
          />
        </InputGroup>

        <ActionGroup>
          <Button onClick={handleBack}>Voltar</Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginLeft: "1.5rem" }}
            disabled={!watchAccept}
          >
            Concluir e salvar
          </Button>
        </ActionGroup>
      </Form>
    </Fade>
  );
};

export default Finish;
