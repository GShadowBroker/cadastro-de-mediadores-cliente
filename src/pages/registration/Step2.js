import React from "react";
import styled from "styled-components";
import { FormLabel, Button, TextField, MenuItem } from "@material-ui/core";
import { useForm } from "react-hook-form";

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
  const { register, handleSubmit } = useForm();

  const submitStep = (data) => {
    console.log("data", data);
    return;
  };

  return (
    <Form onSubmit={handleSubmit(submitStep)}>
      <FormLabel component="legend" style={{ marginBottom: "1.5rem" }}>
        Dados pessoais do mediador
      </FormLabel>
      <InputGroup>
        {/* <Controller
          control={control}
          as={<TextField />}
          id="cpf"
          name="cpf"
          label="CPF"
          type="text"
          variant="outlined"
          defaultValue={personal.cpf}
          required
          inputRef={register({ required: true })}
        /> */}
        <TextField
          id="cpf"
          name="cpf"
          label="CPF"
          type="text"
          variant="outlined"
          defaultValue={personal.cpf}
          required
          inputRef={register({ required: true })}
        />
      </InputGroup>
      <InputGroup>
        {/* <Controller
          control={control}
          as={<TextField />}
          id="name"
          name="name"
          label="Nome completo"
          type="text"
          variant="outlined"
          defaultValue={personal.name}
          required
          inputRef={register({ required: true })}
        /> */}
        <TextField
          id="name"
          name="name"
          label="Nome completo"
          type="text"
          variant="outlined"
          defaultValue={personal.name}
          required
          inputRef={register({ required: true })}
        />
      </InputGroup>

      <InputGroup>
        {/* <Controller
          control={control}
          as={<TextField />}
          id="sex"
          name="sex"
          select
          label="Sexo"
          defaultValue={personal.sex}
          variant="outlined"
          required
          inputRef={register({ required: true })}
        >
          <MenuItem value="selecione">Selecione</MenuItem>
          <MenuItem value="feminino">Feminino</MenuItem>
          <MenuItem value="masculino">Masculino</MenuItem>
        </Controller> */}
        <TextField
          id="sex"
          name="sex"
          select
          label="Sexo"
          defaultValue={personal.sex}
          variant="outlined"
          required
          inputRef={register}
        >
          <MenuItem value="selecione">Selecione</MenuItem>
          <MenuItem value="feminino">Feminino</MenuItem>
          <MenuItem value="masculino">Masculino</MenuItem>
        </TextField>
      </InputGroup>
      <InputGroup>
        {/* <Controller
          control={control}
          as={<TextField />}
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
          inputRef={register({ required: true })}
        /> */}
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
          inputRef={register({ required: true })}
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
