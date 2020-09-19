import React, { useState } from "react";
import styled from "styled-components";
import {
  FormLabel,
  Button,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormControl,
  Chip,
  Paper,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useForm, Controller } from "react-hook-form";
import isValidURL from "../../utils/isValidURL";
import courts from "../../assets/data/courts";

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
  width: 350px;
  max-width: 100%;
`;

const ChipPaper = styled(Paper)`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  list-style: none;
  padding: 5px;
  margin: 1rem 0;
`;

const Professional = ({
  handleNext,
  handleBack,
  professional,
  setProfessional,
}) => {
  const [hasClickedSubmit, setHasClickedSubmit] = useState(false);

  const [inputUnit, setInputUnit] = useState("");
  const [units, setUnits] = useState(["TJMS", "TJBA"]);

  const { register, handleSubmit, control, errors, watch } = useForm();
  const watchCivel = watch("civel");
  const watchFamilia = watch("familia");
  const watchEmpresarial = watch("empresarial");
  const watchCertification = watch("certification");
  const watchResume = watch("resume");

  const isSpecializationProvided = () => {
    if (!hasClickedSubmit) return true;
    if (
      watchCivel === undefined &&
      watchFamilia === undefined &&
      watchEmpresarial === undefined
    ) {
      return true;
    }
    return !!watchCivel || !!watchFamilia || !!watchEmpresarial;
  };

  const submitStep = (data) => {
    const {
      certification,
      average_value,
      attachment,
      civel,
      familia,
      empresarial,
      lattes,
    } = data;

    if (!civel && !familia && !empresarial) {
      setHasClickedSubmit(true);
      return;
    }

    console.log(data);
  };

  const validateCertification = (value) => {
    return ["certificado", "em_formacao"].includes(value);
  };

  const validateAverageValue = (value) => {
    return ["voluntario", "$", "$$", "$$$"].includes(value);
  };

  const getErrorMessageLattes = (error) => {
    switch (error.type) {
      case "required":
        return "O link do seu currículo na plataforma lattes é obrigatório";
      case "validate":
        return "O link informado é inválido";
      default:
        return "Campo inválido";
    }
  };

  const deleteChip = (court) => {
    setUnits([...units].filter((unit) => unit !== court));
  };

  const handleUnitCombobox = ({ target }) => {
    const selectedUnit = target.textContent;
    if (courts.includes(selectedUnit) && !units.includes(selectedUnit)) {
      setUnits([...units, selectedUnit]);
      setInputUnit("");
    }
  };

  return (
    <Form onSubmit={handleSubmit(submitStep)} noValidate>
      <FormLabel component="legend" style={{ marginBottom: "1.5rem" }}>
        Dados profissionais do mediador
      </FormLabel>
      <InputGroup>
        <Controller
          control={control}
          as={TextField}
          id="certification"
          name="certification"
          select
          label="Certificação"
          defaultValue={professional.certification || "selecione"}
          variant="outlined"
          required
          rules={{ required: true, validate: validateCertification }}
          helperText={
            errors.certification &&
            "Selecione se possui uma certificação ou está em formação"
          }
          error={!!errors.certification}
          style={{ minWidth: "100%" }}
        >
          <MenuItem value="selecione">Selecione</MenuItem>
          <MenuItem value="certificado">Certificado</MenuItem>
          <MenuItem value="em_formacao">Em formação</MenuItem>
        </Controller>
      </InputGroup>

      {watchCertification &&
        watchCertification !== "selecione" &&
        watchCertification !== "em_formacao" && (
          <InputGroup>
            <Controller
              control={control}
              as={TextField}
              id="average_value"
              name="average_value"
              select
              label="Valor médio"
              defaultValue={professional.average_value || "selecione"}
              variant="outlined"
              required
              rules={{ required: true, validate: validateAverageValue }}
              helperText={
                errors.average_value &&
                "Selecione o patamar do valor médio cobrado"
              }
              error={!!errors.average_value}
              style={{ minWidth: "100%" }}
            >
              <MenuItem value="selecione">Selecione</MenuItem>
              <MenuItem value="voluntario">Voluntário</MenuItem>
              <MenuItem value="$">Básico</MenuItem>
              <MenuItem value="$$">Médio</MenuItem>
              <MenuItem value="$$$">Alto</MenuItem>
            </Controller>
          </InputGroup>
        )}

      <InputGroup>
        <TextField
          type="file"
          variant="outlined"
          label="Anexo"
          InputLabelProps={{ shrink: true }}
          name="attachment"
          id="attachment"
          inputRef={register}
          helperText={
            errors.attachment && "getErrorMessageLattes(errors.lattes)"
          }
          error={!!errors.attachment}
          style={{ minWidth: "100%" }}
        />
        <FormHelperText>
          Extensões permitidas: .pdf, .doc, .docx, .jpg, .gif, .png. Até 5 MB.
        </FormHelperText>
      </InputGroup>
      <InputGroup>
        <FormGroup>
          <FormControl error={!isSpecializationProvided()} required>
            <FormLabel component="legend">Especialidades</FormLabel>
            <FormControlLabel
              control={<Checkbox name="civel" color="primary" />}
              label="Cível"
              inputRef={register}
            />
            <FormControlLabel
              control={<Checkbox name="familia" color="primary" />}
              label="Família"
              inputRef={register}
            />
            <FormControlLabel
              control={<Checkbox name="empresarial" color="primary" />}
              label="Empresarial"
              inputRef={register}
            />
          </FormControl>
        </FormGroup>
        {!isSpecializationProvided() && (
          <FormHelperText error>
            Selecione pelo menos uma especialidade
          </FormHelperText>
        )}
      </InputGroup>
      <InputGroup>
        <TextField
          id="lattes"
          name="lattes"
          label="Currículo lattes"
          type="text"
          variant="outlined"
          defaultValue={professional.lattes}
          required
          inputRef={register({
            required: true,
            validate: (value) => isValidURL(value),
          })}
          helperText={errors.lattes && getErrorMessageLattes(errors.lattes)}
          error={!!errors.lattes}
          style={{ minWidth: "100%" }}
        />
        <FormHelperText>
          Link do seu currículo na{" "}
          <a
            href="http://lattes.cnpq.br/"
            rel="noopener noreferrer"
            target="_blank"
          >
            plataforma lattes
          </a>
        </FormHelperText>
      </InputGroup>

      <InputGroup>
        <TextField
          id="resume"
          name="resume"
          label="Minicurrículo"
          type="text"
          variant="outlined"
          defaultValue={professional.resume}
          multiline
          required
          inputRef={register({ maxLength: 240 })}
          helperText={
            errors.resume &&
            "O minicurrículo deve conter no máximo 240 caractéres"
          }
          error={!!errors.resume}
          style={{ width: "100%" }}
          rows={4}
        />
        <FormHelperText error={watchResume && watchResume.length > 240}>
          {(watchResume && watchResume.length) || 0} de 240
        </FormHelperText>
      </InputGroup>

      <InputGroup>
        <Autocomplete
          id="actuation_units_combobox"
          options={courts}
          getOptionLabel={(option) => option}
          style={{ width: 300 }}
          /* onChange={handleUnitCombobox}
          inputValue={inputUnit}
          onInputChange={(event, newInputValue) => {
            setInputUnit(newInputValue);
          }} */

          value={inputUnit}
          onChange={(event, newValue) => {
            if (typeof newValue === "string") {
              setInputUnit(newValue);
            } else if (newValue && newValue.inputValue) {
              // Create a new value from the user input
              setInputUnit(newValue.inputValue);
            } else {
              setInputUnit(newValue);
            }
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          renderInput={(params) => (
            <TextField
              {...params}
              label="Unidades de atuação"
              variant="outlined"
            />
          )}
        />
        {units.length > 0 && (
          <ChipPaper component="ul">
            {units.map((court) => (
              <li key={court}>
                <Chip
                  label={court}
                  onDelete={() => deleteChip(court)}
                  style={{ margin: "0 .3rem" }}
                  color="primary"
                />
              </li>
            ))}
          </ChipPaper>
        )}
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

export default Professional;
