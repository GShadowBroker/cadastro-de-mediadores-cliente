import React from "react";
import styled from "styled-components";
import { FormLabel, Button, TextField, MenuItem } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { cpf } from "cpf-cnpj-validator";

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
  width: 230px;
`;

const Step1 = ({ handleNext, handleBack, personal, setPersonal }) => {
  const { register, handleSubmit, control, errors } = useForm();

  const submitStep = (data) => {
    let { name, sex, birthday } = data;
    if (!data.cpf || !name || !sex || !birthday) return;
    if (!["feminino", "masculino"].includes(sex)) return;
    setPersonal({
      ...data,
      cpf: cpf.format(data.cpf),
    });
    handleNext();
  };

  const validateSex = (value) => {
    return ["feminino", "masculino"].includes(value);
  };

  const validateBirthdate = (value) => {
    console.log("date", value);
    if (new Date(value) >= new Date() - 1000 * 60 * 60 * 24 * 30 * 12 * 18)
      return false;
    else if (new Date(value) <= new Date("1900-01-01")) return false;
    return true;
  };

  const getErrorMessageName = (error) => {
    switch (error.type) {
      case "required":
        return "O nome é obrigatório";
      case "maxLength":
        return "O nome fornecido é longo demais (máx. 150 caractéres)";
      case "minLength":
        return "O nome fornecido é curto demais (mín. 4 caractéres)";
      default:
        return "Campo inválido";
    }
  };
  const getErrorMessageCpf = (error) => {
    switch (error.type) {
      case "required":
        return "O CPF é obrigatório";
      case "validate":
        return "O CPF informado é inválido";
      default:
        return "Campo inválido";
    }
  };

  return (
    <Form onSubmit={handleSubmit(submitStep)} noValidate>
      <FormLabel component="legend" style={{ marginBottom: "1.5rem" }}>
        Dados pessoais do mediador
      </FormLabel>
      <InputGroup>
        <TextField
          id="cpf"
          name="cpf"
          label="CPF"
          type="text"
          variant="outlined"
          defaultValue={personal.cpf}
          required
          inputRef={register({
            required: true,
            validate: (value) => cpf.isValid(value),
            maxLength: 15,
          })}
          helperText={errors.cpf && getErrorMessageCpf(errors.cpf)}
          error={!!errors.cpf}
        />
      </InputGroup>
      <InputGroup>
        <TextField
          id="name"
          name="name"
          label="Nome completo"
          type="text"
          variant="outlined"
          defaultValue={personal.name}
          required
          inputRef={register({ required: true, maxLength: 150, minLength: 4 })}
          helperText={errors.name && getErrorMessageName(errors.name)}
          error={!!errors.name}
        />
      </InputGroup>

      <InputGroup>
        <Controller
          control={control}
          as={TextField}
          id="sex"
          name="sex"
          select
          label="Sexo"
          defaultValue={personal.sex}
          variant="outlined"
          required
          rules={{ required: true, validate: validateSex }}
          helperText={errors.sex && "Você deve selecionar o sexo"}
          error={!!errors.sex}
        >
          <MenuItem value="selecione">Selecione</MenuItem>
          <MenuItem value="feminino">Feminino</MenuItem>
          <MenuItem value="masculino">Masculino</MenuItem>
        </Controller>
      </InputGroup>
      <InputGroup>
        <TextField
          id="birthday"
          name="birthday"
          label="Data de nascimeto"
          type="date"
          defaultValue={personal.birthday}
          variant="outlined"
          required
          InputLabelProps={{
            shrink: true,
          }}
          inputRef={register({ required: true, validate: validateBirthdate })}
          helperText={
            errors.birthday && "Data de nascimento inválida ou inverossímil"
          }
          error={!!errors.birthday}
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

export default Step1;
