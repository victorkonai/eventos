import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./../pages/Home";
import Register from "./../pages/Register";
import Login from "./../pages/Login";
import Activity from "./../pages/Activity";
import Details from "./../pages/Details";
import Error from "./../pages/Error";

const Routers = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route path="/activity" exact component={Activity} />
      <Route path="/details" exact component={Details} />
      <Route path="/error" component={Error} />
    </Switch>
  </BrowserRouter>
);

export default Routers;
