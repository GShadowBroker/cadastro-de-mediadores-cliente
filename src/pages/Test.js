import React, { useState } from "react";
import fileToBase64 from "../utils/fileToBase64";

const Test = () => {
  const [value, setValue] = useState("");
  const [convertedFile, setConvertedFile] = useState(null);

  const convertFile = async () => {
    const result = await fileToBase64(value[0]);
    setConvertedFile(result);
    console.log(result);
  };
  return (
    <div>
      <input type="file" onChange={({ target }) => setValue(target.files)} />
      <button onClick={convertFile}>convert</button>
    </div>
  );
};

export default Test;
