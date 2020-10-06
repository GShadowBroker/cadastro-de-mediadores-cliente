export default (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const b64 = reader.result;
      resolve(b64);
    };
    reader.readAsDataURL(file);
  });
};
