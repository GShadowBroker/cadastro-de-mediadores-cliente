import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/registration/Register";

const App = () => {
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLogged(true);
    }, 1000);
  };

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLogged(false);
    }, 1000);
  };

  if (logged) {
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
