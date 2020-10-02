export default (error) => {
  if (error.response) {
    // client received an error response (5xx, 4xx)
    if (error.response.data.error) {
      return error.response.data.error;
    } else {
      return error.response.statusText === "Internal Server Error"
        ? "Erro de comunicação com o servidor. Tente de novo mais tarde."
        : error.response.statusText;
    }
  } else if (error.request) {
    // client never received a response, or request never left
    return "Erro de rede. Tente de novo mais tarde.";
  } else {
    // anything else
    return "Erro inesperado. Tente de novo mais tarde.";
  }
};
