import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/registration/Register";
import { login, logout } from "./services/authService";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./services/authService";
import { login as runLogin, logout as runLogout } from "./store/authReducer";

const App = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const session = useSelector((state) => state.authReducer);

  useEffect(() => {
    console.log("session", session);
    if (!session.isAuthenticated) {
      setLoading(true);
      getUser()
        .then(({ user }) => {
          dispatch(runLogin(user));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
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

  if (session.isAuthenticated) {
    return (
      <Switch>
        <Route path="/protected">
          <div>
            <h1>You are now logged in!</h1>
            {loading ? (
              <button>aguarde...</button>
            ) : (
              <button onClick={handleLogout}>logout</button>
            )}
          </div>
        </Route>
        <Route path="*">
          <Redirect to="/protected" />
        </Route>
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route path="/login">
          <Login handleLogin={handleLogin} loading={loading} />
        </Route>
        <Route path="/registro">
          <Register />
        </Route>
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    );
  }
};

export default App;
