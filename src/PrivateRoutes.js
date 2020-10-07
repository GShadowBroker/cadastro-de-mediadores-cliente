import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Profile from "./pages/private/Profile";
import Navbar from "./components/Navbar";
import DrawerMenu from "./components/DrawerMenu";
import Footer from "./components/Footer";

const PrivateRoutes = ({ drawerOpen, toggleDrawer, handleLogout, loading }) => {
  return (
    <React.Fragment>
      <Navbar handleLogout={handleLogout} toggleDrawer={toggleDrawer} />

      <DrawerMenu
        handleLogout={handleLogout}
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
      />

      <Switch>
        <Route path="/perfil">
          <Profile handleLogout={handleLogout} loading={loading} />
        </Route>
        <Route path="*">
          <div>404 - Página não encontrada!</div>
        </Route>
      </Switch>

      <Footer />
    </React.Fragment>
  );
};

export default PrivateRoutes;
