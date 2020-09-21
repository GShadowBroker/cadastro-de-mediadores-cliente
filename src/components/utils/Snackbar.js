import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Snack = ({ message, severity, autoHideDuration, snackOpen }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!!snackOpen);
  }, [snackOpen]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={() => setOpen(false)}
    >
      <Alert onClose={() => setOpen(false)} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

Snack.defaultProps = {
  message: "Erro inesperado",
  severity: "error",
  autoHideDuration: 6000,
};

export default Snack;
