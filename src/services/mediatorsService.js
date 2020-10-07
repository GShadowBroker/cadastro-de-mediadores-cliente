import axios from "axios";

const endpoint = "/api";
const fullEndpoint = "http://127.0.0.1:8000/api";
const timeout = 15000;

export const getMediatorsList = async ({ limit, offset }) => {
  const result = await axios.get(`${endpoint}/mediadores`, {
    params: { limit, offset },
    timeout,
  });
  return result.data;
};

export const getCamarasList = async ({ limit, offset }) => {
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
  window.open(`${fullEndpoint}/mediadores/${id}/visualizar_anexo`);
};

export const getEstatuto = (id) => {
  window.open(`${fullEndpoint}/camaras/${id}/visualizar_estatuto`);
};

export const getNadaConsta = (id) => {
  window.open(`${fullEndpoint}/camaras/${id}/visualizar_nada_consta`);
};
