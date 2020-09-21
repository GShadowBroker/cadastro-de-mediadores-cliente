import axios from "axios";

const endpoint = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

export const getUfList = async () => {
  const states = await axios.get(endpoint);
  return states.data;
};

export const getCitiesByUf = async (uf) => {
  if (!uf) throw new Error("Nenhum estado selecionado");
  const cities = await axios.get(`${endpoint}/${uf}/municipios`);
  return cities.data;
};
