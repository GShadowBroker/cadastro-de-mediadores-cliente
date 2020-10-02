import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Snack = ({
  message,
  severity,
  autoHideDuration,
  snackOpen,
  setSnackOpen,
}) => {
  return (
    <Snackbar
      open={snackOpen}
      autoHideDuration={autoHideDuration}
      onClose={() => setSnackOpen(false)}
    >
      <Alert onClose={() => setSnackOpen(false)} severity={severity}>
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
