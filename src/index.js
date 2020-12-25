import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Home from "./views/Home.jsx";
import Login from "./views/pages/Login.jsx";
import Register from "./views/pages/Register.jsx";
import Activate from "./views/pages/Activate.jsx";
import Profile from "./views/pages/ProfileUpdate.jsx";
import ForgetPassword from "./views/pages/ForgetPassword.jsx";
import ResetPassword from "./views/pages/ResetPassword.jsx";
import { Provider, teamsTheme } from '@fluentui/react-northstar'
import RedirectRoute from "./app.route";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.render(
  <Provider theme={teamsTheme}>
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" exact render={(props) => <Home {...props} />} /> */}
        <Route path="/login" exact render={(props) => <Login {...props} />} />
        <Route
          path="/register"
          exact
          render={(props) => <Register {...props} />}
        />
        <Route
          path="/users/password/forget"
          exact
          render={(props) => <ForgetPassword {...props} />}
        />
        <Route
          path="/users/password/reset/:token"
          exact
          render={(props) => <ResetPassword {...props} />}
        />
        <Route
          path="/users/activate/:token"
          exact
          render={(props) => <Activate {...props} />}
        />
        <RedirectRoute path="/profile/:userId" exact component={Profile} />
        <RedirectRoute path="/" exact component={Home}/>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>,
  </Provider>,
  document.getElementById("root")
);
