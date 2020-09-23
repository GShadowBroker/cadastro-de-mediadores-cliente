const isCepValid = (cep) => {
  const regex = new RegExp(/^\d{5}\-?\d{3}$/, "i");
  return regex.test(cep);
};

console.log(isCepValid("79851270"));
