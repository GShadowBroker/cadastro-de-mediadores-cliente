import axios from "axios";

const endpoint = "https://cadastro-de-mediadores.herokuapp.com/api";
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
  window.open(`${endpoint}/mediadores/${id}/visualizar_anexo`);
};

export const getEstatuto = (id) => {
  window.open(`${endpoint}/camaras/${id}/visualizar_estatuto`);
};

export const getNadaConsta = (id) => {
  window.open(`${endpoint}/camaras/${id}/visualizar_nada_consta`);
};
