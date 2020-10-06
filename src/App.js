import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/registration/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Test from "./pages/Test";
import ValidateEmail from "./pages/registration/ValidateEmail";

import { login, logout } from "./services/authService";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./services/authService";
import { login as runLogin, logout as runLogout } from "./store/authReducer";
import errorHandler from "./utils/errorHandler";

const App = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const session = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (!session.isAuthenticated) {
      setLoading(true);
      getUser()
        .then(({ user }) => {
          dispatch(runLogin(user));
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(errorHandler(err));
          console.error(err);
        });
    }
  }, [session, dispatch]);

  const handleLogin = async (data) => {
    setLoading(true);
    console.log("credenciais", data);

    try {
      await login(data);
      const { user } = await getUser();
      dispatch(runLogin(user));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    const res = await logout();
    if (res.success) {
      dispatch(runLogout());
      setLoading(false);
    }
  };

  return (
    <Switch>
      <Route path="/validar-conta/:account_type/:user_id/:verification_code">
        <Navbar handleLogout={handleLogout} />
        <ValidateEmail />
        <Footer />
      </Route>

      <Route path="/login">
        {session.isAuthenticated ? (
          <Redirect to="/perfil" />
        ) : (
          <Login handleLogin={handleLogin} loading={loading} />
        )}
      </Route>

      <Route path="/registro">
        {session.isAuthenticated ? <Redirect to="/perfil" /> : <Register />}
      </Route>

      <Route path="/test">
        <Test />
      </Route>

      <Route path="/perfil">
        {session.isAuthenticated ? (
          <React.Fragment>
            <Navbar handleLogout={handleLogout} />
            <div>
              <h1>You are now logged in!</h1>
              {loading ? (
                <button>aguarde...</button>
              ) : (
                <button onClick={handleLogout}>logout</button>
              )}
            </div>
            <Footer />
          </React.Fragment>
        ) : (
          <Redirect to="/login" />
        )}
      </Route>

      <Route path="/">
        <React.Fragment>
          <Navbar handleLogout={handleLogout} />
          <Home />
          <Footer />
        </React.Fragment>
      </Route>

      <Route path="*">
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
};

export default App;
