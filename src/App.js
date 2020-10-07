import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/registration/Register";
import Home from "./pages/Home";
import PrivateRoutes from "./PrivateRoutes";
import Navbar from "./components/Navbar";
import DrawerMenu from "./components/DrawerMenu";
import Footer from "./components/Footer";
import ValidateEmail from "./pages/registration/ValidateEmail";

import { login, logout } from "./services/authService";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./services/authService";
import { login as runLogin, logout as runLogout } from "./store/authReducer";
import errorHandler from "./utils/errorHandler";
import PublicProfileMediator from "./pages/PublicProfileMediator";
import PublicProfileCamara from "./pages/PublicProfileCamara";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [redirectRoute, setRedirectRoute] = useState("/");
  const location = useLocation();

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

  useEffect(() => {
    if (!["/", "/login", "/registro"].includes(location.pathname)) {
      setRedirectRoute(location.pathname);
    }
  }, []); // eslint-disable-line

  const handleLogin = async (data) => {
    setLoading(true);
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

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Switch>
      <Route path="/validar-conta/:account_type/:user_id/:verification_code">
        <Navbar handleLogout={handleLogout} toggleDrawer={toggleDrawer} />
        <DrawerMenu
          handleLogout={handleLogout}
          drawerOpen={drawerOpen}
          toggleDrawer={toggleDrawer}
        />
        <ValidateEmail />
        <Footer />
      </Route>

      <Route path="/perfil/publico/mediador/:id">
        <React.Fragment>
          <Navbar handleLogout={handleLogout} toggleDrawer={toggleDrawer} />
          <DrawerMenu
            handleLogout={handleLogout}
            drawerOpen={drawerOpen}
            toggleDrawer={toggleDrawer}
          />
          <PublicProfileMediator />
          <Footer />
        </React.Fragment>
      </Route>

      <Route path="/perfil/publico/camara/:id">
        <React.Fragment>
          <Navbar handleLogout={handleLogout} toggleDrawer={toggleDrawer} />
          <DrawerMenu
            handleLogout={handleLogout}
            drawerOpen={drawerOpen}
            toggleDrawer={toggleDrawer}
          />
          <PublicProfileCamara />
          <Footer />
        </React.Fragment>
      </Route>

      <Route path="/login">
        {session.isAuthenticated ? (
          <Redirect to={redirectRoute} />
        ) : (
          <Login handleLogin={handleLogin} loading={loading} />
        )}
      </Route>

      <Route path="/registro">
        {session.isAuthenticated ? (
          <Redirect to={redirectRoute} />
        ) : (
          <Register />
        )}
      </Route>

      <Route path="/perfil">
        {session.isAuthenticated ? (
          <PrivateRoutes
            handleLogout={handleLogout}
            drawerOpen={drawerOpen}
            toggleDrawer={toggleDrawer}
            loading={loading}
          />
        ) : (
          <Redirect to="/login" />
        )}
      </Route>

      <Route path="/">
        <React.Fragment>
          <Navbar handleLogout={handleLogout} toggleDrawer={toggleDrawer} />
          <DrawerMenu
            handleLogout={handleLogout}
            drawerOpen={drawerOpen}
            toggleDrawer={toggleDrawer}
          />
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
