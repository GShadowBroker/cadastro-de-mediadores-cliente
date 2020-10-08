import React, { useState, useEffect } from "react";
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
  Fade,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useForm, Controller } from "react-hook-form";
import isValidURL from "../../utils/isValidURL";
import courts from "../../assets/data/courts";
import Snackbar from "../../components/utils/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { submitProfessional } from "../../store/registrationReducer";
import { getUfList, getCitiesByUf } from "../../services/ibgeService";
import Spinner from "../../components/utils/Spinner";
import colors from "../../constants/colors";
import fileToBase64 from "../../utils/fileToBase64";

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

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  color: ${colors.light.secondary.light};

  & > div:first-of-type {
    margin-right: 0.5rem;
  }
`;

const Professional = ({ handleNext, handleBack }) => {
  const dispatch = useDispatch();
  const professional = useSelector(
    (state) => state.registrationReducer.professional
  );

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [isCityDisabled, setIsCityDisabled] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    getUfList()
      .then((ufList) => {
        const sortedUfList = ufList.sort((a, b) => (a.nome > b.nome ? 1 : -1));
        setStates(sortedUfList);
      })
      .catch((err) => console.log(err));
  }, []);

  const [hasClickedSubmit, setHasClickedSubmit] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity] = useState("success");

  const [inputUnit, setInputUnit] = useState("");
  const [units, setUnits] = useState([]);

  const { register, handleSubmit, control, errors, watch } = useForm();
  const watchCivel = watch("civel");
  const watchFamilia = watch("familia");
  const watchEmpresarial = watch("empresarial");
  const watchCertification = watch("certification");
  const watchResume = watch("resume");
  const watchActuationUf = watch("actuation_uf");

  useEffect(() => {
    if (watchActuationUf && watchActuationUf !== "selecione") {
      setIsCityDisabled(false);
      setLoadingCities(true);
      getCitiesByUf(watchActuationUf)
        .then((cities) => {
          setLoadingCities(false);
          setCities(cities);
        })
        .catch((err) => console.log(err));
    } else {
      setIsCityDisabled(true);
    }
  }, [watchActuationUf]);

  const submitStep = async (data) => {
    const {
      certification,
      average_value,
      attachment,
      civel,
      familia,
      empresarial,
      lattes,
      resume,
      actuation_city,
      actuation_uf,
    } = data;

    if (!civel && !familia && !empresarial) {
      setHasClickedSubmit(true);
      return;
    }
    if (units.length === 0) {
      setHasClickedSubmit(true);
      return;
    }

    let specialization = [];
    if (civel) {
      specialization.push("civel");
    }
    if (familia) {
      specialization.push("familia");
    }
    if (empresarial) {
      specialization.push("empresarial");
    }

    // ATENÇÃO! ADICIONAR FUNCIONALIDADE PARA QUE O USUÁRIO POSSA ADICIONAR MÚLTIPLAS CIDADES!
    const actuation_cities = [`${actuation_city}/${actuation_uf}`];

    const base64_attachment = await fileToBase64(
      attachment.length > 0 && attachment[0]
    );

    const professionalInfo = {
      certification,
      average_value: average_value || "voluntario",
      attachment: base64_attachment || "",
      specialization,
      lattes,
      resume,
      actuation_units: units,
      actuation_cities,
    };
    dispatch(submitProfessional(professionalInfo));
    handleNext();
  };

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

  const isActuationUnitProvided = () => {
    if (!hasClickedSubmit) return true;
    return units && units.length > 0;
  };

  const validateCertification = (value) => {
    return ["certificado", "em_formacao"].includes(value);
  };

  const validateAverageValue = (value) => {
    return ["voluntario", "$", "$$", "$$$", "$$$$"].includes(value);
  };

  const enforceSelect = (value) => {
    if (!value) return false;
    return value !== "selecione";
  };

  const validateAttachment = (value) => {
    if (value.length === 0) return true;
    const file = value[0];
    if (file.size > 5242880) {
      return false;
    }
    const fileExtension = file.name.substring(file.name.length - 4);
    const allowedExt = [
      ".pdf",
      ".doc",
      ".docx",
      "docx",
      ".gif",
      ".png",
      ".jpg",
    ];
    if (!allowedExt.includes(fileExtension)) {
      return false;
    }
    return true;
  };

  const getErrorMessageLattes = (error) => {
    switch (error.type) {
      case "required":
        return "O link do seu currículo na plataforma lattes é obrigatório";
      case "validate":
        return "O link informado é inválido";
      case "maxLength":
        return "O link informado é longo demais (máx. 1000 caractéres)";
      default:
        return "Campo inválido";
    }
  };

  const deleteChip = (court) => {
    setUnits([...units].filter((unit) => unit !== court));
  };

  return (
    <Fade in={true}>
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
                  errors.average_value && "Selecione um valor médio cobrado"
                }
                error={!!errors.average_value}
                style={{ minWidth: "100%" }}
              >
                <MenuItem value="selecione">Selecione</MenuItem>
                <MenuItem value="voluntario">Voluntário</MenuItem>
                <MenuItem value="$">Patamar Básico</MenuItem>
                <MenuItem value="$$">Patamar Intermediário</MenuItem>
                <MenuItem value="$$$">Patamar Avançado</MenuItem>
                <MenuItem value="$$$$">Patamar Extraordinário</MenuItem>
              </Controller>
            </InputGroup>
          )}

        <InputGroup>
          <TextField
            type="file"
            variant="outlined"
            label="Anexo"
            InputLabelProps={{ shrink: true }}
            inputProps={{ accept: ".pdf, .doc, .docx, .jpg, .gif, .png" }}
            name="attachment"
            id="attachment"
            inputRef={register({ validate: validateAttachment })}
            helperText={
              errors.attachment &&
              "O anexo é muito grande ou a extensão não é permitida"
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
            <FormHelperText error={true}>
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
              maxLength: 1000,
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
            multiline
            variant="outlined"
            defaultValue={professional.resume}
            inputRef={register({ maxLength: 240 })}
            helperText={
              errors.resume &&
              "O minicurrículo deve conter no máximo 240 caractéres"
            }
            error={!!errors.resume}
            style={{ width: "100%" }}
            rows={4}
          />
          <FormHelperText error={!!(watchResume && watchResume.length > 240)}>
            {(watchResume && watchResume.length) || 0} de 240
          </FormHelperText>
        </InputGroup>

        <InputGroup>
          <Autocomplete
            id="actuation_units_combobox"
            options={courts}
            getOptionLabel={(option) => option}
            style={{ width: "100%" }}
            inputValue={inputUnit}
            onInputChange={(event, newValue) => {
              const currentValue = event.target.textContent;
              setInputUnit(newValue);
              if (
                courts.includes(currentValue) &&
                !units.includes(currentValue)
              ) {
                setUnits([...units, currentValue]);
                setSnackOpen(true);
                setSnackMessage(
                  `${currentValue} adicionado à lista de unidades de atuação`
                );
              }
            }}
            onBlur={() => setInputUnit("")}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            renderInput={(params) => (
              <TextField
                {...params}
                label="Unidades de atuação"
                variant="outlined"
                error={!isActuationUnitProvided()}
                helperText={
                  !isActuationUnitProvided() &&
                  "Selecione pelo menos uma unidade de atuação"
                }
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
                    style={{ margin: ".1rem .3rem" }}
                    color="primary"
                  />
                </li>
              ))}
            </ChipPaper>
          )}
        </InputGroup>

        <InputGroup>
          <Controller
            control={control}
            as={TextField}
            id="uf"
            name="actuation_uf"
            select
            label="UF de atuação"
            defaultValue={professional.actuation_uf || "selecione"}
            variant="outlined"
            required
            rules={{ required: true, validate: enforceSelect }}
            helperText={
              errors.actuation_uf && "Selecione uma unidade federativa válida"
            }
            error={!!errors.actuation_uf}
            style={{ minWidth: "100%" }}
          >
            <MenuItem value="selecione">Selecione</MenuItem>
            {states.length > 0 &&
              states.map((state) => (
                <MenuItem key={state.id} value={state.sigla}>
                  {state.nome}
                </MenuItem>
              ))}
          </Controller>
        </InputGroup>

        {!loadingCities ? (
          <InputGroup>
            <Controller
              control={control}
              as={TextField}
              id="city"
              name="actuation_city"
              select
              label="Cidade de atuação"
              defaultValue={professional.actuation_city || "selecione"}
              variant="outlined"
              required
              rules={{ required: true, validate: enforceSelect }}
              helperText={
                errors.actuation_city &&
                "Selecione uma cidade de atuação válida"
              }
              error={!!errors.actuation_city}
              style={{ minWidth: "100%" }}
              disabled={isCityDisabled}
            >
              <MenuItem value="selecione">Selecione</MenuItem>
              {cities.length > 0 &&
                cities.map((city) => (
                  <MenuItem key={city.id} value={city.nome}>
                    {city.nome}
                  </MenuItem>
                ))}
            </Controller>
          </InputGroup>
        ) : (
          <LoadingContainer>
            <Spinner size={14} />
            <span>carregando municípios</span>
          </LoadingContainer>
        )}

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

        <Snackbar
          message={snackMessage}
          severity={snackSeverity}
          autoHideDuration={6000}
          snackOpen={snackOpen}
          setSnackOpen={setSnackOpen}
        />
      </Form>
    </Fade>
  );
};

export default Professional;
