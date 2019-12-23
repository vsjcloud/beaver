import React from "react";
import {useHistory} from "react-router";

import {BaseLayout} from "../layout/BaseLayout";

export function Dashboard(): React.ReactElement {
  const history = useHistory();
  history.replace("/projects");
  return (
    <BaseLayout loading={true}/>
  )
}
