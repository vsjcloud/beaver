import React from "react";

import BaseLayout from "../layout/BaseLayout";
import ProjectBuilder from "../projectbuilder/ProjectBuilder";

export default class Dashboard extends React.PureComponent {
  public render(): React.ReactNode {
    return (
      <BaseLayout>
        <ProjectBuilder/>
      </BaseLayout>
    );
  }
}
