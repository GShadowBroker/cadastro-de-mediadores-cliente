import axios from "axios";

const endpoint = "/api";
const baseUrl = "https://cadastro-de-mediadores.herokuapp.com/api";
const timeout = 15000;

export const getMediatorsList = async ({ limit, offset, ...filters }) => {
  const { fullname } = filters;
  const result = await axios.get(`${endpoint}/mediadores`, {
    params: fullname ? { limit, offset, fullname } : { limit, offset },
    timeout,
  });
  return result.data;
};

export const getCamarasList = async ({ limit, offset, ...filters }) => {
  const result = await axios.get(`${endpoint}/camaras`, {
    params: { limit, offset },
    timeout,
  });
  return result.data;
};

export const getMediator = async (id) => {
  const result = await axios.get(`${endpoint}/mediadores/${id}`, { timeout });
  return result.data;
};

export const getCamara = async (id) => {
  const result = await axios.get(`${endpoint}/camaras/${id}`, { timeout });
  return result.data;
};

export const getAttachment = (id) => {
  window.open(`${baseUrl}/mediadores/${id}/visualizar_anexo`);
};

export const getEstatuto = (id) => {
  window.open(`${baseUrl}/camaras/${id}/visualizar_estatuto`);
};

export const getNadaConsta = (id) => {
  window.open(`${baseUrl}/camaras/${id}/visualizar_nada_consta`);
};
