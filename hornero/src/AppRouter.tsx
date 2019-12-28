import {Spinner} from "@blueprintjs/core";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {Auth0Callback} from "./components/auth0/Auth0Callback";
import {Auth0Provider, useAuth0} from "./components/auth0/Auth0Provider";
import {Dashboard} from "./components/dashboard/Dashboard";
import {ProjectBuilderContainer} from "./components/project/ProjectBuilderContainer";
import {ProjectsGridContainer} from "./components/project/ProjectsGridContainer";
import * as Config from "./config";

export function AppRouter(): React.ReactElement {
  return (
    <Router basename={Config.BASE_NAME}>
      <Auth0Provider
        domain={Config.AUTH0_DOMAIN}
        client_id={Config.AUTH0_CLIENT_ID}
        redirect_uri={Config.AUTH0_REDIRECT_URI}
        audience={Config.AUTH0_AUDIENCE}
      >
        <Switch>
          <Route path="/auth0/callback" component={Auth0Callback}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/" component={AuthGuard}/>
        </Switch>
      </Auth0Provider>
    </Router>
  );
};

export function AuthGuard(): React.ReactElement {
  const {token, authenticated, loginWithRedirect} = useAuth0()!;

  React.useEffect(function () {
    if (authenticated === undefined || authenticated) {
      return;
    }
    (async function(): Promise<void> {
      await loginWithRedirect();
    })();
  }, [authenticated, loginWithRedirect, token]);

  if (authenticated) {
    return (
      <Switch>
        <Route exact={true} path="/" component={Dashboard}/>
        <Route path="/projects" component={ProjectsGridContainer}/>
        <Route path="/project/:projectID/build" component={ProjectBuilderContainer}/>
      </Switch>
    );
  }

  return PageSpinner;
}

export function Logout(): React.ReactElement {
  const {logout} = useAuth0()!;
  React.useEffect(function () {
    (async (): Promise<void> => {
      await logout();
    })();
  }, [logout]);

  return PageSpinner;
}

const PageSpinner: React.ReactElement = (
  <div className="h-screen w-screen flex justify-center items-center">
    <Spinner intent={Intent.PRIMARY}/>
  </div>
);
