import React, { useEffect, useState } from "react";
import { getMediator } from "../services/mediatorsService";
import { useParams } from "react-router-dom";
import errorHandler from "../utils/errorHandler";
import Snackbar from "../components/utils/Snackbar";
import { useSelector } from "react-redux";

const PublicProfileMediator = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const { id } = useParams();
  const session = useSelector((state) => state.authReducer);

  useEffect(() => {
    setLoading(true);
    if (session.isAuthenticated && session.user.id === id) {
      setUser(session.user);
      setLoading(false);
      return;
    } else if (id) {
      getMediator(id)
        .then((data) => {
          setLoading(false);
          setUser(data);
        })
        .catch((err) => {
          setLoading(false);
          setErrorMessage(errorHandler(err));
          setSnackOpen(true);
        });
    }
  }, [id, session]);

  if (loading) return <h1>CARREGANDO...</h1>;
  if (!user) return <h1>Erro</h1>;

  return (
    <React.Fragment>
      {user.fullname}
      <Snackbar
        message={errorMessage}
        severity="error"
        autoHideDuration={6000}
        snackOpen={snackOpen}
        setSnackOpen={setSnackOpen}
      />
    </React.Fragment>
  );
};

export default PublicProfileMediator;
