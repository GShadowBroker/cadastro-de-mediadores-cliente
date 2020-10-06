import axios from "axios";

const endpoint = "/api/autenticacao";

export const login = async (credentials) => {
  const result = await axios.post(`${endpoint}/login`, credentials);
  return result.data;
};

export const logout = async () => {
  const result = await axios.get(`${endpoint}/logout`);
  return result.data;
};

export const getUser = async () => {
  const result = await axios.get("/api/user");
  return result.data;
};

export const registerMediator = async (formData) => {
  const result = await axios.post(`${endpoint}/registrar/mediador`, formData);
  return result.data;
};

export const registerCamara = async (formData) => {
  const result = await axios.post(`${endpoint}/registrar/camara`, formData);
  return result.data;
};

export const validateEmail = async (id, account_type, code) => {
  const result = await axios.post(
    `${endpoint}/validar_email/${account_type}/${id}/${code}`
  );
  return result.data;
};
