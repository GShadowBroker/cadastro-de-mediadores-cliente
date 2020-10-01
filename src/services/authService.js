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
