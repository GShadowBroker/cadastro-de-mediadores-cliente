let params = {
  a: 1,
  b: null,
  c: undefined,
};

let cleanParams = {};
for (let item in params) {
  if (params[item]) {
    cleanParams[item] = params[item];
  }
}

console.log(cleanParams);
