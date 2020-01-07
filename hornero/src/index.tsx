import React from "react";
import ReactDOM from "react-dom";
import nProgress from "nprogress";

import {AppRouter} from "./AppRouter";

import "./index.scss";

nProgress.configure({
  showSpinner: false,
});

ReactDOM.render(<AppRouter/>, document.getElementById("root"));
