export default (string) => {
  return string
    .split(" ")
    .map((word) =>
      ["de", "da", "do", "ao", "à"].includes(word)
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");
};
