import axios from "axios";

const endpoint = "/api/autenticacao";
const baseUrl = "/api";
const timeout = 15000;

export const login = async (credentials) => {
  const result = await axios.post(`${endpoint}/login`, credentials, {
    timeout,
  });
  return result.data;
};

export const logout = async () => {
  const result = await axios.get(`${endpoint}/logout`, { timeout });
  return result.data;
};

export const getUser = async () => {
  const result = await axios.get(`${baseUrl}/user`, { timeout });
  return result.data;
};

export const registerMediator = async (formData) => {
  const result = await axios.post(`${endpoint}/registrar/mediador`, formData, {
    timeout,
  });
  return result.data;
};

export const registerCamara = async (formData) => {
  const result = await axios.post(`${endpoint}/registrar/camara`, formData, {
    timeout,
  });
  return result.data;
};

export const validateEmail = async (id, account_type, code) => {
  const result = await axios.post(
    `${endpoint}/validar_email/${account_type}/${id}/${code}`,
    { timeout }
  );
  return result.data;
};
