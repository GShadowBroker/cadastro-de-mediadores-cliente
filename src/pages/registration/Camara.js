import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  FormLabel,
  Button,
  TextField,
  MenuItem,
  FormHelperText,
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
import { submitCamara } from "../../store/registrationReducer";
import { getUfList, getCitiesByUf } from "../../services/ibgeService";
import Spinner from "../../components/utils/Spinner";
import colors from "../../constants/colors";
import { cnpj, cpf } from "cpf-cnpj-validator";
import { getAddressByCep } from "../../services/cepService";
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

const Camara = ({ handleNext, handleBack }) => {
  const dispatch = useDispatch();
  const camara = useSelector((state) => state.registrationReducer.camara);

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

  const defaultCep = camara.cep || "";
  const [cep, setCep] = useState(defaultCep);
  const [cepError, setCepError] = useState("");
  const [cepLoading, setCepLoading] = useState(false);

  const isCepValid = (cep) => /^\d{5}-?\d{3}$/i.test(cep);
  const onCepChange = async ({ target }) => {
    const cep = target.value;

    if (isCepValid(cep)) {
      if (cepError) {
        setCepError("");
      }

      setCepLoading(true);
      setCep(cep);

      let address;
      try {
        address = await getAddressByCep(cep);
      } catch (err) {
        console.log(err);
      }
      if (address && address.erro) {
        setCepError("CEP inválido");
        setCepLoading(false);
        return;
      }
      if (!address) {
        setCepError("Falha de comunicação com recurso de CEP");
        setCepLoading(false);
        return;
      }

      setCepLoading(false);
      setAddress(address.logradouro);
      setDistrict(address.bairro);
    } else {
      setCep(cep);
    }
  };

  const defaultAddress = camara.address || "";
  const [address, setAddress] = useState(defaultAddress);
  const onAddressChange = ({ target }) => setAddress(target.value);
  const isAddressValid = (address) => {
    if (!address) return false;
    if (address.length > 155) return false;
    return true;
  };

  const defaultComplement = camara.complement || "";
  const [complement, setComplement] = useState(defaultComplement);
  const onComplementChange = ({ target }) => setComplement(target.value);

  const defaultNumber = camara.number || "";
  const [number, setNumber] = useState(defaultNumber);
  const onNumberChange = ({ target }) => setNumber(target.value);
  const isNumberValid = (number) => {
    if (!number) return false;
    if (number.length > 6) return false;
    return true;
  };

  const defaultDistrict = camara.district || "";
  const [district, setDistrict] = useState(defaultDistrict);
  const onDistrictChange = ({ target }) => setDistrict(target.value);
  const isDistrictValid = (district) => {
    if (!district) return false;
    if (district.length > 155) return false;
    return true;
  };

  const { register, handleSubmit, control, errors, watch } = useForm();
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

  const isActuationUnitProvided = () => {
    if (!hasClickedSubmit) return true;
    return units && units.length > 0;
  };

  const submitStep = async (data) => {
    const {
      cnpj,
      nome_fantasia,
      razao_social,
      site,
      cpf_responsavel,
      estatuto,
      nada_consta,
      average_value,
      actuation_uf,
      actuation_city,
    } = data;

    const estatuto_att = estatuto.length > 0 ? estatuto[0] : null;
    const nada_consta_att = nada_consta.length > 0 ? nada_consta[0] : null;

    let base64_estatuto_att;
    if (estatuto_att) {
      base64_estatuto_att = await fileToBase64(estatuto_att);
    }
    let base64_nada_consta_att;
    if (nada_consta_att) {
      base64_nada_consta_att = await fileToBase64(nada_consta_att);
    }

    if (
      !cnpj ||
      !nome_fantasia ||
      !razao_social ||
      !cpf_responsavel ||
      !base64_estatuto_att ||
      !average_value ||
      !actuation_uf ||
      !actuation_city ||
      units.length === 0
    ) {
      setHasClickedSubmit(true);
      return;
    }

    // ATENÇÃO! ADICIONAR FUNCIONALIDADE PARA QUE O USUÁRIO POSSA ADICIONAR MÚLTIPLAS CIDADES!
    const actuation_cities = [`${actuation_city}/${actuation_uf}`];

    const camaraInfo = {
      cnpj,
      nome_fantasia,
      razao_social,
      cpf_responsavel,
      estatuto: base64_estatuto_att || "",
      nada_consta: base64_nada_consta_att || "",
      average_value,
      site,
      actuation_units: units || [],
      actuation_cities,
      cep,
      address,
      complement,
      number: +number,
      district,
    };
    dispatch(submitCamara(camaraInfo));
    handleNext();
  };

  const validateAverageValue = (value) => {
    return ["$", "$$", "$$$", "$$$$"].includes(value);
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

  const getErrorMessageSite = (error) => {
    switch (error.type) {
      case "validate":
        return "O link informado é inválido";
      case "maxLength":
        return "O link informado é longo demais (máx. 155 caractéres)";
      default:
        return "Campo inválido";
    }
  };
  const getErrorMessageCnpj = (error) => {
    switch (error.type) {
      case "required":
        return "O CNPJ é obrigatório";
      case "validate":
        return "O CNPJ informado é inválido";
      default:
        return "Campo inválido";
    }
  };
  const getErrorMessageCpf = (error) => {
    switch (error.type) {
      case "required":
        return "O número do CPF é obrigatório";
      case "validate":
        return "O CPF informado é inválido";

      default:
        return "Campo inválido";
    }
  };
  const getErrorMessageFantasia = (error) => {
    switch (error.type) {
      case "required":
        return "O nome fantasia é obrigatório";
      case "maxLength":
        return "O nome fantasia fornecido é longo demais (máx. 155 caractéres)";
      case "minLength":
        return "O nome fantasia fornecido é curto demais (mín. 4 caractéres)";
      default:
        return "Campo inválido";
    }
  };
  const getErrorMessageEstatuto = (error) => {
    switch (error.type) {
      case "required":
        return "Anexe o estatuto";
      case "validate":
        return "O anexo é muito grande ou a extensão não é permitida";
      default:
        return "Campo inválido";
    }
  };
  const getErrorMessageRazao = (error) => {
    switch (error.type) {
      case "required":
        return "A razão social é obrigatória";
      case "maxLength":
        return "A razão social fornecida é longa demais (máx. 155 caractéres)";
      case "minLength":
        return "A razão social fornecida é curta demais (mín. 4 caractéres)";
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
          Dados da câmara privada
        </FormLabel>

        <InputGroup>
          <TextField
            id="cnpj"
            name="cnpj"
            label="CNPJ"
            type="text"
            variant="outlined"
            defaultValue={camara.cnpj}
            required
            inputRef={register({
              required: true,
              validate: (value) => cnpj.isValid(value),
            })}
            helperText={errors.cnpj && getErrorMessageCnpj(errors.cnpj)}
            error={!!errors.cnpj}
            style={{ minWidth: "100%" }}
          />
        </InputGroup>

        <InputGroup>
          <TextField
            id="nome_fantasia"
            name="nome_fantasia"
            label="Nome fantasia"
            type="text"
            variant="outlined"
            defaultValue={camara.nome_fantasia}
            required
            inputRef={register({
              required: true,
              maxLength: 155,
              minLength: 4,
            })}
            helperText={
              errors.nome_fantasia &&
              getErrorMessageFantasia(errors.nome_fantasia)
            }
            error={!!errors.nome_fantasia}
            style={{ minWidth: "100%" }}
          />
        </InputGroup>

        <InputGroup>
          <TextField
            id="razao_social"
            name="razao_social"
            label="Razão social"
            type="text"
            variant="outlined"
            defaultValue={camara.razao_social}
            required
            inputRef={register({
              required: true,
              maxLength: 155,
              minLength: 4,
            })}
            helperText={
              errors.razao_social && getErrorMessageRazao(errors.razao_social)
            }
            error={!!errors.razao_social}
            style={{ minWidth: "100%" }}
          />
        </InputGroup>

        <InputGroup>
          <TextField
            id="cpf_responsavel"
            name="cpf_responsavel"
            label="CPF do responsável"
            type="text"
            variant="outlined"
            defaultValue={camara.cpf_responsavel}
            required
            inputRef={register({
              required: true,
              validate: (value) => cpf.isValid(value),
              maxLength: 15,
            })}
            helperText={
              errors.cpf_responsavel &&
              getErrorMessageCpf(errors.cpf_responsavel)
            }
            error={!!errors.cpf_responsavel}
            style={{ minWidth: "100%" }}
          />
        </InputGroup>

        <InputGroup>
          <TextField
            type="file"
            variant="outlined"
            label="Estatuto"
            InputLabelProps={{ shrink: true }}
            inputProps={{ accept: ".pdf, .doc, .docx, .jpg, .gif, .png" }}
            name="estatuto"
            id="estatuto"
            inputRef={register({
              required: true,
              validate: validateAttachment,
            })}
            helperText={
              errors.estatuto && getErrorMessageEstatuto(errors.estatuto)
            }
            error={!!errors.estatuto}
            style={{ minWidth: "100%" }}
          />
          <FormHelperText>
            Extensões permitidas: .pdf, .doc, .docx, .jpg, .gif, .png. Até 5 MB.
          </FormHelperText>
        </InputGroup>

        <InputGroup>
          <TextField
            type="file"
            variant="outlined"
            label="Certidão de nada consta"
            InputLabelProps={{ shrink: true }}
            inputProps={{ accept: ".pdf, .doc, .docx, .jpg, .gif, .png" }}
            name="nada_consta"
            id="nada_consta"
            inputRef={register({ validate: validateAttachment })}
            helperText={
              errors.nada_consta &&
              "O anexo é muito grande ou a extensão não é permitida"
            }
            error={!!errors.nada_consta}
            style={{ minWidth: "100%" }}
          />
          <FormHelperText>
            Extensões permitidas: .pdf, .doc, .docx, .jpg, .gif, .png. Até 5 MB.
          </FormHelperText>
        </InputGroup>

        <InputGroup>
          <Controller
            control={control}
            as={TextField}
            id="average_value"
            name="average_value"
            select
            label="Valor médio"
            defaultValue={camara.average_value || "selecione"}
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
            <MenuItem value="$">Patamar Básico</MenuItem>
            <MenuItem value="$$">Patamar Intermediário</MenuItem>
            <MenuItem value="$$$">Patamar Avançado</MenuItem>
            <MenuItem value="$$$$">Patamar Extraordinário</MenuItem>
          </Controller>
        </InputGroup>

        <InputGroup>
          <TextField
            id="site"
            name="site"
            label="Website"
            type="text"
            variant="outlined"
            defaultValue={camara.site}
            inputRef={register({
              validate: (value) => (value === "" ? true : isValidURL(value)),
              maxLength: 155,
            })}
            helperText={errors.site && getErrorMessageSite(errors.site)}
            error={!!errors.site}
            style={{ minWidth: "100%" }}
          />
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
            defaultValue={camara.actuation_uf || "selecione"}
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
              defaultValue={camara.actuation_city || "selecione"}
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

        <InputGroup>
          <TextField
            id="cep"
            name="cep"
            label="CEP"
            type="text"
            variant="outlined"
            value={cep}
            onChange={onCepChange}
            required
            error={!!cepError}
            style={{ width: "100%" }}
          />
          {cepLoading && (
            <LoadingContainer>
              <Spinner size={14} />
              <span>validando CEP</span>
            </LoadingContainer>
          )}
          {cepError && <FormHelperText error={true}>{cepError}</FormHelperText>}
        </InputGroup>

        <InputGroup>
          <TextField
            id="address"
            name="address"
            label="Endereço"
            type="text"
            variant="outlined"
            value={address}
            onChange={onAddressChange}
            required
            style={{ width: "100%" }}
            disabled={!isCepValid(cep)}
            error={hasClickedSubmit && !isAddressValid(address)}
          />
          {hasClickedSubmit && !isAddressValid(address) ? (
            <FormHelperText error={true}>
              Informe um endereço válido de até 155 caractéres
            </FormHelperText>
          ) : null}
        </InputGroup>

        <InputGroup>
          <TextField
            id="complement"
            name="complement"
            label="Complemento"
            type="text"
            variant="outlined"
            value={complement}
            onChange={onComplementChange}
            style={{ width: "100%" }}
            disabled={!isCepValid(cep)}
          />
        </InputGroup>

        <InputGroup>
          <TextField
            id="number"
            name="number"
            label="Número"
            type="text"
            variant="outlined"
            value={number}
            onChange={onNumberChange}
            required
            style={{ width: "100%" }}
            disabled={!isCepValid(cep)}
            error={hasClickedSubmit && !isNumberValid(number)}
          />
          {hasClickedSubmit && !isNumberValid(number) ? (
            <FormHelperText error={true}>
              Informe um número válido
            </FormHelperText>
          ) : null}
        </InputGroup>

        <InputGroup>
          <TextField
            id="district"
            name="district"
            label="Bairro"
            type="text"
            variant="outlined"
            value={district}
            onChange={onDistrictChange}
            required
            style={{ width: "100%" }}
            disabled={!isCepValid(cep)}
            error={hasClickedSubmit && !isDistrictValid(district)}
          />
          {hasClickedSubmit && !isDistrictValid(district) ? (
            <FormHelperText error={true}>
              Informe um bairro válido
            </FormHelperText>
          ) : null}
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

export default Camara;
