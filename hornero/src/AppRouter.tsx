import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Dashboard}/>
      </Switch>
    </Router>
  );
};

export default AppRouter;
