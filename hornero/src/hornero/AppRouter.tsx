import {Spinner} from "@blueprintjs/core";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {Auth0Callback} from "./components/auth0/Auth0Callback";
import {Auth0Provider, useAuth0} from "./components/auth0/Auth0Provider";
import {Dashboard} from "./components/dashboard/Dashboard";

import {Config} from "../core/config";

export const AppRouter: React.FC = () => {
  return (
    <Router basename={Config.BASE_NAME}>
      <Auth0Provider
        domain={Config.AUTH0_DOMAIN}
        client_id={Config.AUTH0_CLIENT_ID}
        redirect_uri={Config.AUTH0_REDIRECT_URI}
        audience={Config.AUTH0_AUDIENCE}
      >
        <Switch>
          <Route exact={true} path="/auth0/callback" component={Auth0Callback}/>
          <Route exact={true} path="/logout" component={Logout}/>
          <Route exact={true} path="/" component={AuthGuard}/>
        </Switch>
      </Auth0Provider>
    </Router>
  );
};

export const AuthGuard: React.FC = () => {
  const {checked, authenticated, loginWithRedirect} = useAuth0();

  React.useEffect(() => {
    if (!checked || authenticated) {
      return;
    }
    (async (): Promise<void> => {
      await loginWithRedirect();
    })();
  }, [checked, authenticated, loginWithRedirect]);

  if (authenticated) {
    return (
      <Switch>
        <Route exact={true} path="/" component={Dashboard}/>
      </Switch>
    );
  }

  return PageSpinner;
};

export const Logout: React.FC = () => {
  const {logout} = useAuth0();
  React.useEffect(() => {
    (async (): Promise<void> => {
      await logout();
    })();
  }, [logout]);

  return PageSpinner;
};

const PageSpinner: React.ReactElement = (
  <div className="h-screen w-screen flex justify-center items-center">
    <Spinner intent={Intent.PRIMARY}/>
  </div>
);
