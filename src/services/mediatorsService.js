import axios from "axios";

const endpoint = "/api";

export const getMediatorsList = async ({ limit, offset }) => {
  const result = await axios.get(`${endpoint}/mediadores`, {
    params: { limit, offset },
  });
  return result.data;
};

export const getCamarasList = async ({ limit, offset }) => {
  const result = await axios.get(`${endpoint}/camaras`, {
    params: { limit, offset },
  });
  return result.data;
};
