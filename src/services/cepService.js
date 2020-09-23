import axios from "axios";

const endpoint = "https://viacep.com.br/ws/";

export const getAddressByCep = async (cep) => {
  const regex = new RegExp(/^\d{5}-?\d{3}$/, "i");
  if (!regex.test(cep)) return;
  const address = await axios.get(`${endpoint}/${cep}/json`);
  return address.data;
};
